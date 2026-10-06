import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import SvgMap from "./SvgMap";
import { getSanctuaryPointsForColor, Sanctuaries } from './game/sanctuaries';

// --- Zoomable/Pannable SVG Map Wrapper ---
interface ZoomablePanSvgMapProps extends React.ComponentProps<typeof SvgMap> {
  onResetZoom?: (resetFn: () => void) => void;
}

const ZoomablePanSvgMap: React.FC<ZoomablePanSvgMapProps> = (props) => {
  // Extract onResetZoom from props
  const { onResetZoom, ...svgMapProps } = props;
  
  // Responsive SVG sizing: fill parent, viewBox always [0,0,1600,1600]
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState<[number, number, number, number]>([0, 0, 8192, 8192]);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);

  // Reset zoom function
  const resetZoom = () => {
    setViewBox([0, 0, 8192, 8192]);
  };

  // Expose reset function to parent
  React.useEffect(() => {
    if (onResetZoom) {
      onResetZoom(resetZoom);
    }
  }, [onResetZoom]);

  // Keyboard controls
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!svgRef.current) return;
      
      const panAmount = viewBox[2] * 0.1; // Pan 10% of current view
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setViewBox(([x, y, w, h]) => [x, y - panAmount, w, h]);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setViewBox(([x, y, w, h]) => [x, y + panAmount, w, h]);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setViewBox(([x, y, w, h]) => [x - panAmount, y, w, h]);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setViewBox(([x, y, w, h]) => [x + panAmount, y, w, h]);
          break;
        case '=':
        case '+':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const zoomFactor = 0.9;
            const centerX = viewBox[0] + viewBox[2] / 2;
            const centerY = viewBox[1] + viewBox[3] / 2;
            setViewBox(([x, y, w, h]) => {
              const newW = w * zoomFactor;
              const newH = h * zoomFactor;
              if (newW < 500 || newH < 500) return [x, y, w, h];
              return [centerX - newW / 2, centerY - newH / 2, newW, newH];
            });
          }
          break;
        case '-':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const zoomFactor = 1.1;
            const centerX = viewBox[0] + viewBox[2] / 2;
            const centerY = viewBox[1] + viewBox[3] / 2;
            setViewBox(([x, y, w, h]) => {
              const newW = w * zoomFactor;
              const newH = h * zoomFactor;
              if (newW > 16384 || newH > 16384) return [x, y, w, h];
              return [centerX - newW / 2, centerY - newH / 2, newW, newH];
            });
          }
          break;
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            resetZoom();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewBox, resetZoom]);

  // Mouse/touch pan handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (svgRef.current) {
      setDrag({ x: e.clientX, y: e.clientY });
    }
  };
  const onMouseMove = (e: React.MouseEvent) => {
  if (!drag || !svgRef.current || e.buttons !== 1) {
    if (e.buttons !== 1) {
      setDrag(null);
    }
    return;
  }

  const rect = svgRef.current.getBoundingClientRect();
  const dx = ((e.clientX - drag.x) / rect.width) * viewBox[2];
  const dy = ((e.clientY - drag.y) / rect.height) * viewBox[3];

  setViewBox(([x, y, w, h]) => {
    const newX = x - dx;
    const newY = y - dy;

    const maxOffset = Math.max(w, h) * 0.5;
    const minX = -maxOffset;
    const minY = -maxOffset;
    const maxX = 8192 + maxOffset - w;
    const maxY = 8192 + maxOffset - h;

    return [
      Math.max(minX, Math.min(maxX, newX)),
      Math.max(minY, Math.min(maxY, newY)),
      w,
      h,
    ];
  });

  setDrag({ x: e.clientX, y: e.clientY });
};
  const onMouseUp = () => setDrag(null);

// Mouse wheel = zoom only
React.useEffect(() => {
  const containerElement = containerRef.current;
  if (!containerElement) return;

  const handleWheel = (e: WheelEvent) => {

    e.preventDefault();
    e.stopPropagation();

    setDrag(null);

    setViewBox(([x, y, w, h]) => {

      const zoomFactor = e.deltaY < 0 ? 0.9 : 1.1;

      const newW = Math.min(
        Math.max(w * zoomFactor, 500),
        16384
      );

      const newH = Math.min(
        Math.max(h * zoomFactor, 500),
        16384
      );

      // Always zoom around the center of the current view
      const centerX = x + w / 2;
      const centerY = y + h / 2;

      const newX = centerX - newW / 2;
      const newY = centerY - newH / 2;

      return [newX, newY, newW, newH];
    });
  };

  containerElement.addEventListener('wheel', handleWheel, {
    passive: false,
  });

  return () => {
    containerElement.removeEventListener('wheel', handleWheel);
  };
}, []);

  // Touch handlers for mobile support
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setDrag({ x: touch.clientX, y: touch.clientY });
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (drag && e.touches.length === 1 && svgRef.current) {
      const touch = e.touches[0];
      const rect = svgRef.current.getBoundingClientRect();
      const dx = ((touch.clientX - drag.x) / rect.width) * viewBox[2];
      const dy = ((touch.clientY - drag.y) / rect.height) * viewBox[3];
      
      setViewBox(([x, y, w, h]) => {
        const newX = x - dx;
        const newY = y - dy;
        
        // Apply same bounds as mouse move
        const maxOffset = Math.max(w, h) * 0.5;
        const minX = -maxOffset;
        const minY = -maxOffset;
        const maxX = 8192 + maxOffset - w;
        const maxY = 8192 + maxOffset - h;
        
        return [
          Math.max(minX, Math.min(maxX, newX)),
          Math.max(minY, Math.min(maxY, newY)),
          w,
          h,
        ];
      });
      
      setDrag({ x: touch.clientX, y: touch.clientY });
    }
  };

  const onTouchEnd = () => setDrag(null);

  return (
    <div
      ref={containerRef}
      style={{
  width: '100%',
  height: 'calc(100vh - 120px)',
  minHeight: 400,
  maxHeight: '100vh',
  cursor: drag ? 'grabbing' : 'grab',
  userSelect: 'none',
  background: 'transparent',
  borderRadius: 8,
  border: 'none',
  overflow: 'hidden',
  position: 'relative',
  touchAction: 'none',
}}
    >
      {/* Help overlay */}
      <div style={{
        position: 'absolute',
        top: 108,
  right: 12,
        background: 'rgba(0, 0, 0, 0.75)',
        color: '#fff',
        padding: '10px 12px',
        borderRadius: 8,
        fontSize: 12,
        zIndex: 10,
        pointerEvents: 'none',
        lineHeight: 1.5,
        width: 260,
        boxShadow: '0 4px 12px rgba(0,0,0,0.35)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 6, fontSize: 13 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" role="presentation" style={{ flex: '0 0 auto' }}>
            <line x1="8" y1="2" x2="8" y2="14" stroke="#fff" strokeWidth="1.5" />
            <polygon points="8,1 6.5,3 9.5,3" fill="#fff" />
            <polygon points="8,15 6.5,13 9.5,13" fill="#fff" />
            <line x1="2" y1="8" x2="14" y2="8" stroke="#fff" strokeWidth="1.5" />
            <polygon points="1,8 3,6.5 3,9.5" fill="#fff" />
            <polygon points="15,8 13,6.5 13,9.5" fill="#fff" />
          </svg>
          <span>Controls</span>
        </div>
        <div>Scroll: zoom</div>
        <div>Drag: pan</div>
        <div>Arrow keys: pan</div>

      </div>
      <svg
        ref={svgRef}
        viewBox={viewBox.join(' ')}
        width="100%"
        height="100%"
        style={{
  display: 'block',
  background: 'none',
  transform: 'translateY(-75px)'
}}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <SvgMap {...svgMapProps} />
      </svg>
    </div>
  );
};

// Rich color palette with named colors
const COLORS = [
  "#DC143C", "#DAA520", "#008080", "#808000", "#8B4513", "#483D8B", "#CD5C5C", "#8FBC8F", "#FF8C00", "#4682B4", "#8B008B", "#CD853F"
];

const MapSelector: React.FC = () => {
  // tileColors: { [tileId: number]: color }
  const [tileColors, setTileColors] = useState<{ [id: number]: string }>({});
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[2]);
  const [colorLabels, setColorLabels] = useState<{ [color: string]: string }>({});
  const [editingLabel, setEditingLabel] = useState<string | null>(null);

  
  // States for gates and shrines
  const [gateColors, setGateColors] = useState<{ [id: string]: string }>({});
  const [shrineColors, setShrineColors] = useState<{ [id: string]: string }>({});
  // Temple configuration is a fixed constant (provided by data): tile id 38
  const TEMPLE_TILE_ID = 38;

  // Max selections allowed per color/label across tiles, gates, and shrines
  const MAX_PER_COLOR = 50;

  // ----- Center section scoring config -----
  // Assumptions: Center area tiles roughly IDs 1..36 from SvgMap, center gates gate1..gate16
  // Sanctuaries just north/south of center: shrine13 (north), shrine15 (south)
  // Temple tile at the very center: tile ID 30
  const CENTER_TILE_IDS = React.useMemo(() => new Set<number>([
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,
    31,32,33,34,35,36
  ]), []);
  const CENTER_GATE_IDS = React.useMemo(() => new Set<string>([
    'gate1','gate2','gate3','gate4','gate5','gate6','gate7','gate8',
    'gate9','gate10','gate11','gate12','gate13','gate14','gate15','gate16'
  ]), []);
  // Sanctuary territories are now defined by owning specific tiles (see ./game/sanctuaries)
  const SANCTUARY_TILE_IDS = React.useMemo(() => new Set<number>(
    Sanctuaries.REGIONS.flatMap(r => r.tileIds)
  ), []);
  // TEMPLE_TILE_ID is fixed as above
  
  // Ref to store the reset zoom function
  const resetZoomRef = useRef<(() => void) | null>(null);

  // Calculate color counts (tiles + gates + shrines)
  const colorCounts = COLORS.reduce((acc, color) => {
    const tileCount = Object.values(tileColors).filter(tileColor => tileColor === color).length;
    const gateCount = Object.values(gateColors).filter(gateColor => gateColor === color).length;
    const shrineCount = Object.values(shrineColors).filter(shrineColor => shrineColor === color).length;
    acc[color] = tileCount + gateCount + shrineCount;
    return acc;
  }, {} as { [color: string]: number });

  // Calculate per-color Center scoring (structures only within center section)
  const centerScores = React.useMemo(() => {
    const scores: { [color: string]: number } = {};
    for (const color of COLORS) {
      // Center territories (tiles)
      let centerTileCount = 0;
      for (const [idStr, c] of Object.entries(tileColors)) {
        const id = Number(idStr);
        // Exclude sanctuary tiles from base center-tile scoring to avoid double-counting
        if (c === color && CENTER_TILE_IDS.has(id) && !SANCTUARY_TILE_IDS.has(id)) centerTileCount++;
      }

      // Center gates
      let centerGateCount = 0;
      for (const [id, c] of Object.entries(gateColors)) {
        if (c === color && CENTER_GATE_IDS.has(id)) centerGateCount++;
      }

  // Sanctuaries (north/south) scored by tile ownership
  const sanctuaryPts = getSanctuaryPointsForColor(tileColors, color);

      // Temple in the very center
    const templePts = tileColors[TEMPLE_TILE_ID] === color ? 10000 : 0;

      const score = centerTileCount * 300 + centerGateCount * 1500 + sanctuaryPts + templePts;
      scores[color] = score;
    }
    return scores;
  }, [COLORS, tileColors, gateColors, shrineColors, CENTER_TILE_IDS, CENTER_GATE_IDS, SANCTUARY_TILE_IDS]);

  // Reset all selections
  const resetSelections = () => {
    setTileColors({});
    setColorLabels({});
    setGateColors({});
    setShrineColors({});
  };

    // Export functionality
  // Export functionality
// Export functionality
const exportAsImage = async (format: 'png' | 'jpg' = 'png') => {
  try {
    const outerSvg = document.querySelector(
      '[data-export-target] > div > svg'
    ) as SVGSVGElement | null;

    if (!outerSvg) {
      throw new Error('Outer map SVG not found.');
    }

    const innerSvg = outerSvg.querySelector(
      'svg'
    ) as SVGSVGElement | null;

    if (!innerSvg) {
      throw new Error('Inner map SVG not found.');
    }

    /*
     * Only include colors that are actually used
     * on at least one territory, gate or shrine.
     */
    const activeColors = COLORS.filter(
      (color) => colorCounts[color] > 0
    );

    /*
     * Create export wrapper
     */
    const exportWrapper = document.createElement('div');

    exportWrapper.style.position = 'fixed';
    exportWrapper.style.left = '-100000px';
    exportWrapper.style.top = '0';
    exportWrapper.style.width = '1400px';
    exportWrapper.style.background = 'transparent';
    exportWrapper.style.overflow = 'hidden';
    exportWrapper.style.padding = '24px';
    exportWrapper.style.boxSizing = 'border-box';
    exportWrapper.style.display = 'flex';
    exportWrapper.style.alignItems = 'stretch';
    exportWrapper.style.gap = '24px';


   // ---------------------------------------------------------
// SIRO STATS EXPORT BACKGROUND
// ---------------------------------------------------------

const exportBackground = document.createElement('div');

exportBackground.style.position = 'absolute';
exportBackground.style.inset = '0';
exportBackground.style.zIndex = '0';
exportBackground.style.backgroundImage =
  "url('/images/siro-stats-background.jpg')";
exportBackground.style.backgroundSize = 'cover';
exportBackground.style.backgroundPosition = 'center';
exportBackground.style.backgroundRepeat = 'no-repeat';
exportBackground.style.filter = 'none';
exportBackground.style.transform = 'scale(1.03)';
exportBackground.style.opacity = '0.78';

// Light readability overlay
const exportBackgroundOverlay = document.createElement('div');

exportBackgroundOverlay.style.position = 'absolute';
exportBackgroundOverlay.style.inset = '0';
exportBackgroundOverlay.style.zIndex = '1';
exportBackgroundOverlay.style.background =
  'rgba(255,255,255,0.10)';

exportWrapper.appendChild(exportBackground);
exportWrapper.appendChild(exportBackgroundOverlay); 

    /*
     * ---------------------------------------------------------
     * MAP
     * ---------------------------------------------------------
     */

    const mapContainer = document.createElement('div');

    mapContainer.style.width = '900px';
mapContainer.style.height = '900px';
mapContainer.style.flex = '0 0 900px';
    mapContainer.style.background = '#faf9f6';
    mapContainer.style.border = '1px solid #bbb';
    mapContainer.style.position = 'relative';
mapContainer.style.zIndex = '2';
    mapContainer.style.borderRadius = '8px';
    mapContainer.style.overflow = 'hidden';

    /*
     * Clone the ACTUAL map SVG.
     */
    const mapSvg = innerSvg.cloneNode(true) as SVGSVGElement;

mapSvg.setAttribute('viewBox', '730 825 6600 6700');
mapSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

mapSvg.setAttribute('width', '100%');
mapSvg.setAttribute('height', '100%');

mapSvg.style.display = 'block';
mapSvg.style.width = '100%';
mapSvg.style.height = '100%';

    mapContainer.appendChild(mapSvg);

    /*
     * ---------------------------------------------------------
     * LEGEND
     * ---------------------------------------------------------
     */

    const legend = document.createElement('div');

    legend.style.width = '320px';
legend.style.flex = '0 0 320px';
    legend.style.background = '#ffffff';
    legend.style.border = '1px solid #d1d5db';
    legend.style.position = 'relative';
legend.style.zIndex = '2';
    legend.style.borderRadius = '8px';
    legend.style.padding = '18px';
    legend.style.boxSizing = 'border-box';
    legend.style.fontFamily =
      'Arial, Helvetica, sans-serif';
    legend.style.color = '#111827';

    const legendTitle = document.createElement('div');

    legendTitle.textContent = 'Zone 3 Territory Points';
    legendTitle.style.fontSize = '18px';
    legendTitle.style.fontWeight = '700';
    legendTitle.style.marginBottom = '16px';

    legend.appendChild(legendTitle);

    activeColors.forEach((color) => {
      const row = document.createElement('div');

      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.gap = '10px';
      row.style.marginBottom = '10px';

      /*
       * Color circle
       */
      const colorCircle = document.createElement('div');

      colorCircle.style.width = '16px';
      colorCircle.style.height = '16px';
      colorCircle.style.minWidth = '16px';
      colorCircle.style.borderRadius = '50%';
      colorCircle.style.background = color;
      colorCircle.style.border =
        '1px solid rgba(0,0,0,0.25)';

      /*
       * Custom label:
       *
       * If the user entered a real name -> use it.
       * If the value is still "Label" -> show the color.
       */
      const customLabel =
        colorLabels[color]?.trim();

      const displayName =
        customLabel &&
        customLabel.toLowerCase() !== 'label'
          ? customLabel
          : color;

      const name = document.createElement('div');

      name.textContent = displayName;
      name.style.flex = '1';
      name.style.fontSize = '14px';
      name.style.fontWeight = '600';
      name.style.whiteSpace = 'nowrap';

      /*
       * IMPORTANT:
       * Use the existing ARC scoring calculation.
       */
      const points = document.createElement('div');

      points.textContent =
        centerScores[color].toLocaleString();

      points.style.fontSize = '14px';
      points.style.fontWeight = '700';
      points.style.whiteSpace = 'nowrap';

      row.appendChild(colorCircle);
      row.appendChild(name);
      row.appendChild(points);

      legend.appendChild(row);
    });

/*
 * ---------------------------------------------------------
 * SIRO STATS CREDITS / WATERMARK
 * ---------------------------------------------------------
 */

const credits = document.createElement('div');

credits.style.width = '84px';
credits.style.flex = '0 0 84px';
credits.style.height = '900px';
credits.style.position = 'relative';
credits.style.zIndex = '2';
credits.style.display = 'flex';
credits.style.alignItems = 'center';
credits.style.justifyContent = 'center';
credits.style.overflow = 'visible';

/*
 * Create the credit line horizontally first,
 * then rotate the complete group by -90°.
 */
const creditsInner = document.createElement('div');

creditsInner.style.width = '900px';
creditsInner.style.display = 'flex';
creditsInner.style.alignItems = 'center';
creditsInner.style.justifyContent = 'center';
creditsInner.style.gap = '18px';
creditsInner.style.whiteSpace = 'nowrap';
creditsInner.style.transform = 'rotate(-90deg)';
creditsInner.style.transformOrigin = 'center center';
creditsInner.style.fontFamily =
  'Arial, Helvetica, sans-serif';

/*
 * SIRO STATS
 */
const creditsBrand = document.createElement('div');

creditsBrand.textContent = 'SIRO STATS';
creditsBrand.style.fontSize = '24px';
creditsBrand.style.fontWeight = '800';
creditsBrand.style.letterSpacing = '1.5px';
creditsBrand.style.color = '#ffffff';

/*
 * Separator
 */
const separator1 = document.createElement('div');

separator1.textContent = '•';
separator1.style.fontSize = '14px';
separator1.style.fontWeight = '700';
separator1.style.color = '#ffffff';

/*
 * Website
 */
const creditsWebsite = document.createElement('div');

creditsWebsite.textContent = 'siro-stats.com';
creditsWebsite.style.fontSize = '14px';
creditsWebsite.style.fontWeight = '600';
creditsWebsite.style.color = '#ffffff';

/*
 * Separator
 */
const separator2 = document.createElement('div');

separator2.textContent = '•';
separator2.style.fontSize = '14px';
separator2.style.fontWeight = '700';
separator2.style.color = '#ffffff';

/*
 * Tool name
 */
const creditsTool = document.createElement('div');

creditsTool.textContent = 'ARC Map-Generator';
creditsTool.style.fontSize = '14px';
creditsTool.style.fontWeight = '600';
creditsTool.style.color = '#ffffff';

/*
 * Build the credit line
 */
creditsInner.appendChild(creditsBrand);
creditsInner.appendChild(separator1);
creditsInner.appendChild(creditsWebsite);
creditsInner.appendChild(separator2);
creditsInner.appendChild(creditsTool);

credits.appendChild(creditsInner);

/*
 * Add map + legend + credits
 */
exportWrapper.appendChild(mapContainer);
exportWrapper.appendChild(legend);
exportWrapper.appendChild(credits);

document.body.appendChild(exportWrapper);


    /*
     * Give the browser one frame to render
     * the cloned SVG before html2canvas captures it.
     */
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve())
    );

    const canvas = await html2canvas(
      exportWrapper,
      {
        backgroundColor:
          format === 'jpg'
            ? '#ffffff'
            : null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      }
    );

    document.body.removeChild(exportWrapper);

/*
 * Download
 */
const blob = await new Promise<Blob | null>((resolve) => {
  canvas.toBlob(
    (result) => resolve(result),
    `image/${format}`,
    0.9
  );
});

if (!blob) {
  throw new Error('Failed to create image blob.');
}

const url = URL.createObjectURL(blob);

const link = document.createElement('a');

link.download = `map-selection.${format}`;
link.href = url;

document.body.appendChild(link);
link.click();
document.body.removeChild(link);

URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Export failed:', error);

    alert(
      'Failed to export image. Please try again.'
    );
  }
};

  // Copy current selection as shareable data
  const copySelectionData = async () => {
    const selectionData = {
      tiles: tileColors,
  gates: gateColors,
  shrines: shrineColors,
  templeTileId: TEMPLE_TILE_ID,
      labels: colorLabels,
      timestamp: new Date().toISOString(),
  totalTiles: Object.keys(tileColors).length,
  totalGates: Object.keys(gateColors).length,
  totalShrines: Object.keys(shrineColors).length,
  version: '1.2'
    };
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(selectionData, null, 2));
      alert('Selection data copied to clipboard!');
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Failed to copy selection data.');
    }
  };

  // Import selection data from JSON
  const importSelectionData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (data.tiles && typeof data.tiles === 'object') {
            // Convert string keys back to numbers and validate colors
            const validTiles: { [id: number]: string } = {};
            Object.entries(data.tiles).forEach(([key, color]) => {
              const tileId = parseInt(key);
              if (!isNaN(tileId) && typeof color === 'string' && COLORS.includes(color)) {
                validTiles[tileId] = color;
              }
            });
            setTileColors(validTiles);
            
            // Import labels if they exist
            if (data.labels && typeof data.labels === 'object') {
              const validLabels: { [color: string]: string } = {};
              Object.entries(data.labels).forEach(([color, label]) => {
                if (typeof color === 'string' && typeof label === 'string' && COLORS.includes(color)) {
                  validLabels[color] = label;
                }
              });
              setColorLabels(validLabels);
            }

            // Import gates if they exist
            if (data.gates && typeof data.gates === 'object') {
              const validGates: { [id: string]: string } = {};
              Object.entries<string>(data.gates).forEach(([id, color]) => {
                if (typeof id === 'string' && typeof color === 'string' && COLORS.includes(color)) {
                  validGates[id] = color;
                }
              });
              setGateColors(validGates);
            }

            // Import shrines if they exist
            if (data.shrines && typeof data.shrines === 'object') {
              const validShrines: { [id: string]: string } = {};
              Object.entries<string>(data.shrines).forEach(([id, color]) => {
                if (typeof id === 'string' && typeof color === 'string' && COLORS.includes(color)) {
                  validShrines[id] = color;
                }
              });
              setShrineColors(validShrines);
            }

            // Temple tile id is fixed; ignore any provided value
            
            const tilesCount = Object.keys(validTiles).length;
            const gatesCount = data.gates ? Object.keys(data.gates).length : 0;
            const shrinesCount = data.shrines ? Object.keys(data.shrines).length : 0;
            alert(`Imported: tiles ${tilesCount}${data.gates ? `, gates ${gatesCount}` : ''}${data.shrines ? `, shrines ${shrinesCount}` : ''}.`);
          } else {
            alert('Invalid file format. Please select a valid selection data file.');
          }
        } catch (error) {
          console.error('Import failed:', error);
          alert('Failed to import selection data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // Import from clipboard
  const importFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const data = JSON.parse(clipboardText);
      
      if (data.tiles && typeof data.tiles === 'object') {
        // Convert string keys back to numbers and validate colors
        const validTiles: { [id: number]: string } = {};
        Object.entries(data.tiles).forEach(([key, color]) => {
          const tileId = parseInt(key);
          if (!isNaN(tileId) && typeof color === 'string' && COLORS.includes(color)) {
            validTiles[tileId] = color;
          }
        });
        setTileColors(validTiles);
        
        // Import labels if they exist
        if (data.labels && typeof data.labels === 'object') {
          const validLabels: { [color: string]: string } = {};
          Object.entries(data.labels).forEach(([color, label]) => {
            if (typeof color === 'string' && typeof label === 'string' && COLORS.includes(color)) {
              validLabels[color] = label;
            }
          });
          setColorLabels(validLabels);
        }

        // Import gates if they exist
        if (data.gates && typeof data.gates === 'object') {
          const validGates: { [id: string]: string } = {};
          Object.entries<string>(data.gates).forEach(([id, color]) => {
            if (typeof id === 'string' && typeof color === 'string' && COLORS.includes(color)) {
              validGates[id] = color;
            }
          });
          setGateColors(validGates);
        }

        // Import shrines if they exist
        if (data.shrines && typeof data.shrines === 'object') {
          const validShrines: { [id: string]: string } = {};
          Object.entries<string>(data.shrines).forEach(([id, color]) => {
            if (typeof id === 'string' && typeof color === 'string' && COLORS.includes(color)) {
              validShrines[id] = color;
            }
          });
          setShrineColors(validShrines);
        }

  // Temple tile id is fixed; ignore any provided value
        
        const tilesCount = Object.keys(validTiles).length;
        const gatesCount = data.gates ? Object.keys(data.gates).length : 0;
        const shrinesCount = data.shrines ? Object.keys(data.shrines).length : 0;
        alert(`Imported from clipboard: tiles ${tilesCount}${data.gates ? `, gates ${gatesCount}` : ''}${data.shrines ? `, shrines ${shrinesCount}` : ''}.`);
      } else {
        alert('Invalid clipboard data. Please copy valid selection data first.');
      }
    } catch (error) {
      console.error('Clipboard import failed:', error);
      alert('Failed to import from clipboard. Please check the data format.');
    }
  };

  // Save selection data as JSON file
  const saveSelectionData = () => {
    const selectionData = {
      tiles: tileColors,
  gates: gateColors,
  shrines: shrineColors,
  templeTileId: TEMPLE_TILE_ID,
      labels: colorLabels,
      timestamp: new Date().toISOString(),
      totalTiles: Object.keys(tileColors).length,
  totalGates: Object.keys(gateColors).length,
  totalShrines: Object.keys(shrineColors).length,
  version: '1.2'
    };
    
    const blob = new Blob([JSON.stringify(selectionData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `map-selection-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle label editing
  const handleLabelEdit = (color: string, label: string) => {
    setColorLabels(prev => ({
      ...prev,
      [color]: label
    }));
  };

  const handleLabelKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditingLabel(null);
    }
  };

  // Handler to set color for a tile (multi-color selection)
  const handleTileClick = (id: number) => {
    setTileColors((prev) => {
      // If already this color, remove color (deselect)
      if (prev[id] === selectedColor) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      // Enforce max per color across tiles + gates + shrines
      const currentTileCount = Object.values(prev).filter((c) => c === selectedColor).length;
      const currentGateCount = Object.values(gateColors).filter((c) => c === selectedColor).length;
      const currentShrineCount = Object.values(shrineColors).filter((c) => c === selectedColor).length;
      const totalForColor = currentTileCount + currentGateCount + currentShrineCount;
      if (totalForColor >= MAX_PER_COLOR) {
        alert(`Max ${MAX_PER_COLOR} selections reached for this color/label.`);
        return prev;
      }
      // Otherwise, set to selectedColor
      return { ...prev, [id]: selectedColor };
    });
  };

  // Handler for gate clicks
  const handleGateClick = (id: string) => {
    setGateColors((prev) => {
      // If already this color, remove color (deselect)
      if (prev[id] === selectedColor) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      // Enforce max per color across tiles + gates + shrines
      const currentTileCount = Object.values(tileColors).filter((c) => c === selectedColor).length;
      const currentGateCount = Object.values(prev).filter((c) => c === selectedColor).length;
      const currentShrineCount = Object.values(shrineColors).filter((c) => c === selectedColor).length;
      const totalForColor = currentTileCount + currentGateCount + currentShrineCount;
      if (totalForColor >= MAX_PER_COLOR) {
        alert(`Max ${MAX_PER_COLOR} selections reached for this color/label.`);
        return prev;
      }
      // Otherwise, set to selectedColor
      return { ...prev, [id]: selectedColor };
    });
  };

  // Handler for shrine clicks  
  const handleShrineClick = (id: string) => {
    setShrineColors((prev) => {
      // If already this color, remove color (deselect)
      if (prev[id] === selectedColor) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      // Enforce max per color across tiles + gates + shrines
      const currentTileCount = Object.values(tileColors).filter((c) => c === selectedColor).length;
      const currentGateCount = Object.values(gateColors).filter((c) => c === selectedColor).length;
      const currentShrineCount = Object.values(prev).filter((c) => c === selectedColor).length;
      const totalForColor = currentTileCount + currentGateCount + currentShrineCount;
      if (totalForColor >= MAX_PER_COLOR) {
        alert(`Max ${MAX_PER_COLOR} selections reached for this color/label.`);
        return prev;
      }
      // Otherwise, set to selectedColor
      return { ...prev, [id]: selectedColor };
    });
  };

  // For highlighting: which tiles are currently selected (any color)
  const selectedTiles = Object.keys(tileColors).map(Number);
  const selectedGates = Object.keys(gateColors);
  const selectedShrines = Object.keys(shrineColors);

  return (
    <div style={{ height: 'calc(100vh - 80px)', width: '100%', margin: 0, padding: 0, overflow: 'hidden', position: 'relative', background: 'transparent' }}>
      <div style={{
        margin: 0,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        position: 'absolute',
        top: '12px',
        left: 0,
        width: '100vw',
        zIndex: 2,
        background: 'transparent',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'
      }}>
        <div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 16,
  width: '100%'
}}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 500, color: '#fff' }}></span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {COLORS.map((color) => (
                <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 80 }}>
                  <button
                    style={{
                      background: color,
                      border: selectedColor === color ? "2.5px solid #fff" : "1px solid #888",
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      margin: 0,
                      cursor: "pointer",
                      outline: 'none',
                      boxShadow: selectedColor === color ? '0 0 6px #fff' : undefined,
                      transition: 'border 0.2s, box-shadow 0.2s',
                    }}
                    aria-label={color}
                    onClick={() => setSelectedColor(color)}
                  />
                  
                  {/* Label input/display */}
                  {editingLabel === color ? (
                    <input
                      type="text"
                      value={colorLabels[color] || ''}
                      onChange={(e) => handleLabelEdit(color, e.target.value)}
                      onBlur={() => setEditingLabel(null)}
                      onKeyPress={handleLabelKeyPress}
                      autoFocus
                      style={{
                        width: '80px',
                        fontSize: '12px',
                        padding: '2px 4px',
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        textAlign: 'center',
                        background: '#fff',
                        color: '#000',
                      }}
                      placeholder="Label"
                    />
                  ) : (
                    <div
                      onClick={() => setEditingLabel(color)}
                      style={{
                        fontSize: '12px',
                        color: '#fff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        minHeight: '18px',
                        width: '80px',
                        padding: '3px 4px',
                        borderRadius: '3px',
                        background: colorLabels[color] ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)',
                        border: '1px solid transparent',
                        transition: 'background 0.2s',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title={colorLabels[color] || 'Click to add label'}
                    >
                      {colorLabels[color] || 'Label'}
                    </div>
                  )}
                  
                  {colorCounts[color] > 0 && (
                    <span style={{ 
                      fontSize: '11px', 
                      color: '#fff', 
                      fontWeight: 'bold',
                      background: 'rgba(0,0,0,0.6)',
                      padding: '1px 4px',
                      borderRadius: '8px',
                      minWidth: '16px',
                      textAlign: 'center'
                    }}>
                      {colorCounts[color]}
                    </span>
                  )}

                  {/* Center section score */}
                  {centerScores[color] > 0 && (
                    <span
                      title="Center score"
                      style={{
                        fontSize: '11px',
                        color: '#ffd54f',
                        fontWeight: 'bold',
                        background: 'rgba(0,0,0,0.6)',
                        padding: '1px 4px',
                        borderRadius: '8px',
                        minWidth: '16px',
                        textAlign: 'center'
                      }}
                    >
                      {centerScores[color].toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={resetSelections}
            style={{
              background: '#dc3545',
              color: '#fff',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
          >
            Reset All
          </button>
          
          <button
            onClick={() => resetZoomRef.current?.()}
            style={{
              background: '#17a2b8',
              color: '#fff',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              transition: 'background 0.2s',
              marginLeft: '8px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#138496'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#17a2b8'}
          >
            Reset Zoom
          </button>
          
          <button
  onClick={() => exportAsImage('png')}
  style={{
    background: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500,
    transition: 'background 0.2s',
    marginLeft: '8px',
  }}
  onMouseEnter={(e) => e.currentTarget.style.background = '#218838'}
  onMouseLeave={(e) => e.currentTarget.style.background = '#28a745'}
>
  Save PNG
</button>
        </div>
      </div>
      <div style={{
        position: 'absolute',
        top: 130,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 72px)',
        zIndex: 1,
        background: 'transparent',
        // Add data attribute for export targeting
      }}>
        <div data-export-target style={{ width: '100%', height: '100%' }}>
          <ZoomablePanSvgMap
            selectedTiles={selectedTiles}
            selectedColor={selectedColor}
            tileColors={tileColors}
            colorLabels={colorLabels}
            onTileClick={handleTileClick}
            selectedGates={selectedGates}
            gateColors={gateColors}
            onGateClick={handleGateClick}
            selectedShrines={selectedShrines}
            shrineColors={shrineColors}
            onShrineClick={handleShrineClick}
            onResetZoom={(resetFn) => { resetZoomRef.current = resetFn; }}
          />
        </div>
      </div>
      
      {/* Scoring Legend (right side) */}
    <div
        aria-label="Scoring Legend"
        style={{
          position: 'fixed',
          top: 410,
          right: 12,
          width: 260,
          background: 'rgba(0, 0, 0, 0.75)',
          color: '#fff',
          padding: '10px 12px',
          borderRadius: 8,
          zIndex: 5,
          boxShadow: '0 4px 12px rgba(0,0,0,0.35)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 6, fontSize: 13 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" role="presentation" style={{ flex: '0 0 auto' }}>
            <circle cx="8" cy="5" r="3" fill="none" stroke="#fff" strokeWidth="1.5" />
            <polygon points="6,8 5,14 7.5,12" fill="#fff" opacity="0.9" />
            <polygon points="10,8 8.5,12 11,14" fill="#fff" opacity="0.9" />
          </svg>
          <span>Zone 3 Scoring Legend</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.5, fontSize: 12 }}>
          <li><strong>+300</strong> per center territory tile</li>
          <li><strong>+1,500</strong> per center gate</li>
          <li><strong>+1,500</strong> North Sanctuary (tile 1)</li>
          <li><strong>+1,500</strong> South Sanctuary (tile 41)</li>
          <li><strong>+10,000</strong> Temple (tile 38)</li>
        </ul>
        <div style={{ marginTop: 6, fontSize: 11, opacity: 0.8 }}>
          Sanctuary points go to the color that owns the listed tiles. Sanctuary tiles are excluded from the base +300 center-tile score.
        </div>
      </div>

 
    </div>
  );
};

export default MapSelector;