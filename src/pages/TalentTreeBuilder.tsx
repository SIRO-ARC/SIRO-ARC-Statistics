import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PoweredBy from "../components/home/PoweredBy";

import { heroMapping } from "../tools/talent-builder/data/heroes/heroMapping";
import { DrawConnections } from "../tools/talent-builder/src/drawConnections";
import { DrawNode } from "../tools/talent-builder/src/drawNode";
import { getCoordinates } from "../tools/talent-builder/headers/position";

import {
  getHeroStars,
  getHeroFragments,
  getShardCost,
  MAXPOINTS,
} from "../tools/talent-builder/src/hero";
import { StatsPanel } from "../tools/talent-builder/src/StatsPanel";
import { calculateTalentStats } from "../tools/talent-builder/src/stats";
import { talents } from "../tools/talent-builder/data/talents";
import { exportTalentBuild } from "../tools/talent-builder/src/exportBuild";

const heroDisplayNames: Record<string, string> = {
  aangFN: "Fire Nation Aang",
  kataraPL: "Painted Lady Katara",
  kataraSF: "Fire Nation Katara",
  kingBumiMK: "Mad King Bumi",
  korraEq: "Equalist Korra",
  sokkaWW: "Wolf Warrior Sokka",
  tophLB: "Lady Toph Beifong",
  zukoAH: "Avatar Hunter Zuko",
};

const getHeroDisplayName = (key: string) => {
  return (
    heroDisplayNames[key] ??
    heroMapping[key].title.split(" - ")[0]
  );
};

export default function TalentTreeBuilder() {
  const heroKeys = Object.keys(heroMapping).sort((a, b) =>
    heroMapping[a].title
      .split(" - ")[0]
      .localeCompare(
        heroMapping[b].title.split(" - ")[0]
      )
  );

  const [heroKey, setHeroKey] = useState(
    heroKeys[0] ?? "bumi"
  );

  const hero = heroMapping[heroKey];

  const [selectedTalentNodes, setSelectedTalentNodes] =
    useState<Record<number, number>>({});
  
  const [showStats, setShowStats] =
  useState(false);  

  const [mobileTooltipTalentId, setMobileTooltipTalentId] =
  useState<number | null>(null);

  /*
   * UNDO / REDO HISTORY
   */

  const [undoStack, setUndoStack] = useState<
    Record<number, number>[]
  >([]);

  const [redoStack, setRedoStack] = useState<
    Record<number, number>[]
  >([]);

  const updateSelectedTalentNodes = (
    action:
      | Record<number, number>
      | ((
          previous: Record<number, number>
        ) => Record<number, number>)
  ) => {
    setSelectedTalentNodes((previous) => {
      const next =
        typeof action === "function"
          ? action(previous)
          : action;

      if (JSON.stringify(previous) === JSON.stringify(next)) {
        return previous;
      }

      setUndoStack((current) => [
        ...current,
        previous,
      ]);

      setRedoStack([]);

      return next;
    });
  };

  function undo() {
    setUndoStack((currentUndo) => {
      if (currentUndo.length === 0) {
        return currentUndo;
      }

      const previous =
        currentUndo[currentUndo.length - 1];

      setSelectedTalentNodes((currentState) => {
        setRedoStack((currentRedo) => [
          ...currentRedo,
          currentState,
        ]);

        return previous;
      });

      return currentUndo.slice(0, -1);
    });
  }

  function redo() {
    setRedoStack((currentRedo) => {
      if (currentRedo.length === 0) {
        return currentRedo;
      }

      const next =
        currentRedo[currentRedo.length - 1];

      setSelectedTalentNodes((currentState) => {
        setUndoStack((currentUndo) => [
          ...currentUndo,
          currentState,
        ]);

        return next;
      });

      return currentRedo.slice(0, -1);
    });
  }

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;

  const viewportRef = useRef<HTMLDivElement>(null);

  const BASE_ZOOM = 0.85;

  const [zoom, setZoom] = useState(BASE_ZOOM);
  const [pan, setPan] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] =
    useState(false);

  const dragStart = useRef({
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
  });

  /*
   * Calculate the actual dimensions of the current talent tree
   * from its layout instead of assuming a fixed canvas.
   */

  const treeBounds = useMemo(() => {
    if (!hero?.layout?.length) {
      return {
        minX: 0,
        maxX: 2200,
        minY: 0,
        maxY: 620,
        width: 2200,
        height: 620,
      };
    }

    const positions = hero.layout.map((node) =>
      getCoordinates(node.pos)
    );

    const minX = Math.min(
      ...positions.map((p) => p.x)
    );

    const maxX = Math.max(
      ...positions.map((p) => p.x + 40)
    );

    const minY = Math.min(
      ...positions.map((p) => p.y)
    );

    const maxY = Math.max(
      ...positions.map((p) => p.y + 55)
    );

    const padding = 100;

    return {
      minX: minX - padding,
      maxX: maxX + padding,
      minY: minY - padding,
      maxY: maxY + padding,
      width:
        maxX - minX + padding * 2,
      height:
        maxY - minY + padding * 2,
    };
  }, [hero]);

  const treeWidth = treeBounds.width;
  const treeHeight = treeBounds.height;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      resetViewport();
    });

    return () =>
      cancelAnimationFrame(frame);
  }, [heroKey, treeWidth]);

  function clampPan(
    x: number,
    y: number,
    currentZoom = zoom
  ) {
    const viewport = viewportRef.current;

    if (!viewport) {
      return { x, y };
    }

    const viewportWidth =
      viewport.clientWidth;

    const viewportHeight =
      viewport.clientHeight;

    const scaledWidth =
      treeWidth * currentZoom;

    const scaledHeight =
      treeHeight * currentZoom;

    const maxX = Math.max(
      0,
      (scaledWidth - viewportWidth) / 2
    );

    const maxY = Math.max(
      0,
      (scaledHeight - viewportHeight) / 2
    );

    return {
      x: Math.max(
        -maxX,
        Math.min(maxX, x)
      ),
      y: Math.max(
        -maxY,
        Math.min(maxY, y)
      ),
    };
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    const target =
      event.target as HTMLElement;

    if (
      target.closest("button") ||
      target.closest("select") ||
      target.closest("img")
    ) {
      return;
    }

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };

    setIsDragging(true);
  }

  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    if (!isDragging) return;

    const dx =
      event.clientX -
      dragStart.current.x;

    const dy =
      event.clientY -
      dragStart.current.y;

    const nextX =
      dragStart.current.panX + dx;

    const nextY =
      dragStart.current.panY + dy;

    setPan(
      clampPan(nextX, nextY)
    );
  }

  function handlePointerUp(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {}

    setIsDragging(false);
  }

  function setZoomLevel(
    nextZoom: number
  ) {
    const clampedZoom = Math.max(
      0.35,
      Math.min(
        BASE_ZOOM,
        Number(nextZoom.toFixed(2))
      )
    );

    setZoom(clampedZoom);

    setPan((currentPan) =>
      clampPan(
        currentPan.x,
        currentPan.y,
        clampedZoom
      )
    );
  }

  function zoomIn() {
    setZoomLevel(zoom + 0.1);
  }

  function zoomOut() {
    setZoomLevel(zoom - 0.1);
  }

  function handleWheel(
    event: React.WheelEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    const direction =
      event.deltaY > 0 ? -1 : 1;

    setZoomLevel(
      zoom + direction * 0.1
    );
  }

  function resetViewport() {
    const viewport =
      viewportRef.current;

    if (!viewport) {
      setZoom(BASE_ZOOM);
      setPan({
        x: 0,
        y: 0,
      });
      return;
    }

    const viewportWidth =
      viewport.clientWidth;

    const scaledTreeWidth =
      treeWidth * BASE_ZOOM;

    /*
     * Position the first talent near
     * the left side of the viewport.
     */

    const firstTalentX =
      50 * BASE_ZOOM;

    const leftPadding = 42;

    const startX =
      (scaledTreeWidth -
        viewportWidth) /
        2 -
      firstTalentX +
      leftPadding;

    setZoom(BASE_ZOOM);

    setPan({
      x: startX,
      y: 0,
    });
  }

  function fitTree() {
    resetViewport();
  }

  const talentPoints = useMemo(
    () =>
      Object.values(
        selectedTalentNodes
      ).reduce(
        (sum, value) =>
          sum + value,
        0
      ),
    [selectedTalentNodes]
  );

  const completedTalents = useMemo(
  () =>
    hero.layout.filter((talentNode) => {
      const points =
        selectedTalentNodes[talentNode.id] || 0;

      const maxPoints =
        talents[talentNode.talentId]?.maxPoints || 1;

      return points >= maxPoints;
    }).length,
  [
    hero.layout,
    selectedTalentNodes,
  ]
);

  const stars =
    getHeroStars(talentPoints);

  const fragments =
    getHeroFragments(talentPoints);

  const shards =
    getShardCost(talentPoints);

  const talentStats = useMemo(
    () =>
        calculateTalentStats(
            hero.layout,
            selectedTalentNodes
        ),
    [
        hero.layout,
        selectedTalentNodes,
    ]
);

  function handleHeroChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const nextHero =
      event.target.value;

    setHeroKey(nextHero);

    setSelectedTalentNodes({});

    setUndoStack([]);
    setRedoStack([]);
    setMobileTooltipTalentId(null);
  }

  function resetTree() {
  setSelectedTalentNodes({});
  setUndoStack([]);
  setRedoStack([]);

  setMobileTooltipTalentId(null);

  resetViewport();
}

  const handleExportBuild = async () => {
  try {
    await exportTalentBuild({
      hero: {
        title: getHeroDisplayName(heroKey),
        iconImage: hero.iconImage,
        layout: hero.layout,
      },
      selectedTalentNodes,
      talentPoints,
      maxPoints: MAXPOINTS,
      stats: talentStats,
    });
  } catch (error) {
    console.error(
      "Failed to export talent build:",
      error
    );
  }
};

if (!hero) {
  return (
    <div className="mx-auto mt-20 max-w-4xl px-4 text-center text-red-400">
      Talent Tree could not be loaded.
    </div>
  );
}

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-2">

  <h1 className="mb-2 text-4xl font-bold">
    Talent Tree Builder
  </h1>

  <p className="mb-6 text-gray-400">
    Build and customize your hero talent trees.
  </p>

</section>

      <section className="mx-auto mt-2 max-w-6xl px-4">

        {/* TOOLBAR */}

        <div className="w-full lg:max-w-[280px]">
  <select
    value={heroKey}
    onChange={handleHeroChange}
    className="w-full rounded-xl border border-sky-400/60 bg-slate-900 px-4 py-2 text-white outline-none shadow-[0_0_12px_rgba(56,189,248,0.15)] transition focus:border-sky-400"
  >
    {heroKeys.map((key) => (
      <option
        key={key}
        value={key}
      >
        {getHeroDisplayName(key)}
      </option>
    ))}
  </select>
</div>

        {/* TREE VIEWPORT */}

        <div
          ref={viewportRef}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative mt-6 h-[559px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl select-none touch-none"
          style={{
            cursor: isDragging
              ? "grabbing"
              : "grab",
          }}
        >

          {/* UNDO / REDO */}

          <div className="pointer-events-auto absolute bottom-4 left-4 z-50 hidden md:flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 p-2 shadow-lg backdrop-blur">

            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              title="Undo"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg font-bold text-white transition hover:border-sky-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-700 disabled:hover:bg-slate-800"
            >
              ↶
            </button>

            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              title="Redo"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg font-bold text-white transition hover:border-sky-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-slate-700 disabled:hover:bg-slate-800"
            >
              ↷
            </button>

                          <button
  type="button"
  onClick={resetTree}
  className="flex h-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm font-semibold text-white transition hover:border-sky-500 hover:bg-slate-700"
>
  ↩ Reset
</button>

          </div>

          {/* VIEWPORT CONTROLS */}

          <div className="pointer-events-auto absolute bottom-4 left-1/2 z-50 flex w-[calc(100%-24px)] -translate-x-1/2 items-center gap-1 rounded-xl border border-slate-700 bg-slate-900/90 p-1.5 shadow-lg backdrop-blur md:right-4 md:left-auto md:w-auto md:translate-x-0 md:gap-2 md:p-2">

<button
  type="button"
  onClick={handleExportBuild}
  className="flex h-10 md:h-9 flex-1 md:flex-none items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10 px-3 text-sm font-semibold text-sky-300 transition hover:border-sky-400 hover:bg-sky-400/20"
>
  📸 Export
</button>

            <button
  type="button"
  onClick={() => setShowStats(true)}
  className="flex h-10 md:h-9 flex-1 md:flex-none items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm font-semibold text-sky-300 transition hover:border-sky-500 hover:bg-slate-700"
>
  ✦ Stats
</button>

<button
  type="button"
  onClick={undo}
  disabled={!canUndo}
  title="Undo"
  className="flex h-10 md:h-9 flex-1 md:flex-none items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg font-bold text-white transition hover:border-sky-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-35 md:hidden"
>
  ↶
</button>

<button
  type="button"
  onClick={redo}
  disabled={!canRedo}
  title="Redo"
  className="flex h-10 md:h-9 flex-1 md:flex-none items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg font-bold text-white transition hover:border-sky-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-35 md:hidden"
>
  ↷
</button>

<button
  type="button"
  onClick={resetTree}
  title="Reset"
  className="flex h-10 md:h-9 flex-1 md:flex-none items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2 text-xs font-semibold text-white transition hover:border-sky-500 hover:bg-slate-700 md:hidden"
>
  ↩ Reset
</button>

            <button
              type="button"
              onClick={zoomOut}
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg font-bold text-white transition hover:border-sky-500 hover:bg-slate-700 md:flex"
            >
              −
            </button>

            <button
              type="button"
              onClick={resetViewport}
              className="hidden min-w-[58px] rounded-lg border border-slate-700 bg-slate-800 px-2 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-500 hover:bg-slate-700 md:flex"
            >
              {Math.round(
                (zoom / BASE_ZOOM) * 100
              )}
              %
            </button>

            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= BASE_ZOOM}
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg font-bold text-white transition hover:border-sky-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-700 disabled:hover:bg-slate-800 md:flex"
            >
              +
            </button>

            <button
              type="button"
              onClick={fitTree}
              className="flex h-10 md:h-9 flex-1 md:flex-none items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm font-semibold text-sky-300 transition hover:border-sky-500 hover:bg-slate-700"
            >
              Fit
            </button>

          </div>

{showStats && (
  <StatsPanel
    stats={talentStats}
    talentPoints={talentPoints}
    maxPoints={MAXPOINTS}
    completedTalents={completedTalents}
    onClose={() => setShowStats(false)}
/>
)}

          {/* TREE CANVAS */}

          <div
            className="pointer-events-auto absolute left-1/2 top-1/2"
            style={{
              width: `${treeWidth}px`,
              height: `${treeHeight}px`,
              transform: `
                translate(
                  calc(-50% + ${pan.x}px),
                  calc(-50% + ${pan.y}px)
                )
                scale(${zoom})
              `,
              transformOrigin:
                "center center",
              willChange: "transform",
            }}
          >

            <div className="relative h-full w-full overflow-hidden bg-[#050B16]">

              {/* SIRO GAMING BACKGROUND */}

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(14,116,144,0.14),transparent_55%)]" />

              <div
                className="absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(56,189,248,0.10) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(56,189,248,0.10) 1px, transparent 1px)
                  `,
                  backgroundSize:
                    "80px 80px",
                }}
              />

              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

              {/* HERO INFO */}

              <div className="absolute left-5 top-5 z-20 flex items-center gap-4">

                {/* HERO PORTRAIT */}

                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-sky-400/40 bg-[#071426]/90 p-1.5 shadow-[0_0_24px_rgba(56,189,248,0.18)] backdrop-blur-sm">

                  <img
                    src={hero.iconImage}
                    alt={hero.title}
                    className="h-full w-full rounded-xl object-contain"
                    draggable={false}
                  />

                </div>

                {/* HERO INFO */}

                <div className="flex flex-col">

                  <h2 className="text-xl font-bold tracking-wide text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]">
                    {getHeroDisplayName(heroKey)}
                  </h2>

                  <div className="mt-1 text-base font-semibold text-white">
                    {talentPoints} /{" "}
                    {MAXPOINTS}
                  </div>

                </div>

              </div>

              {/* CONNECTIONS */}

              <DrawConnections
                layout={hero.layout}
                selectedTalentNodes={
                  selectedTalentNodes
                }
              />

              {/* TALENT NODES */}

              {hero.layout.map(
                (talentNode) => (
                  <DrawNode
    key={talentNode.id}
    talentNode={talentNode}
    selectedTalentNodes={selectedTalentNodes}
    setSelectedTalentNodes={updateSelectedTalentNodes}
    layout={hero.layout}
    talentPoints={talentPoints}
    allowEdit={true}
    mobileTooltipTalentId={mobileTooltipTalentId}
    setMobileTooltipTalentId={setMobileTooltipTalentId}
/>
                )
              )}

            </div>
          </div>
        </div>

      </section>

      <PoweredBy />
    </>
  );
}