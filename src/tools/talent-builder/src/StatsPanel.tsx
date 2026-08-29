import React from "react";
import {
    CalculatedStat,
    getStatCategoryLabel,
    groupTalentStats,
} from "./stats";

interface StatsPanelProps {
    stats: CalculatedStat[];
    talentPoints: number;
    maxPoints: number;
    completedTalents: number;
    onClose: () => void;
}

const categoryIcons: Record<string, string> = {
    OFFENSIVE: "⚔",
    DEFENSIVE: "🛡",
    UTILITY: "✦",
    CAPACITY: "👥",
    HEALING: "♥",
    SIEGE: "⚔",
    GARRISON: "🏰",
    GATHERING: "⛏",
};

function formatValue(value: number): string {
    if (Number.isInteger(value)) {
        return value.toString();
    }

    return value
        .toFixed(2)
        .replace(/\.?0+$/, "");
}

function formatStatValue(
    stat: CalculatedStat
): string {
    return `${formatValue(stat.value)}${stat.unit || ""}`;
}

export const StatsPanel: React.FC<
    StatsPanelProps
> = ({
    stats,
    talentPoints,
    maxPoints,
    completedTalents,
    onClose,
}) => {

    const groupedStats =
        groupTalentStats(stats);

    const categories =
        Object.keys(groupedStats);

    const progress =
        maxPoints > 0
            ? Math.min(
                100,
                (talentPoints / maxPoints) * 100
            )
            : 0;

    return (
        <div
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/45 p-6 backdrop-blur-[2px]"
            onMouseDown={(event) => {

                /*
                 * Only close when the actual overlay
                 * background is clicked.
                 */
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
            onWheel={(event) => {
                /*
                 * Prevent the wheel event from reaching
                 * the Talent Tree viewport.
                 */
                event.stopPropagation();
            }}
            onPointerDown={(event) => {
                /*
                 * Prevent dragging/panning of the
                 * Talent Tree while Stats are open.
                 */
                event.stopPropagation();
            }}
        >

            <div
                className="flex max-h-[calc(100%-2rem)] w-full max-w-[460px] flex-col overflow-hidden rounded-2xl border border-sky-400/30 bg-[#071426]/95 shadow-[0_0_40px_rgba(56,189,248,0.16)] backdrop-blur-xl"
                onMouseDown={(event) => {
                    event.stopPropagation();
                }}
                onPointerDown={(event) => {
                    event.stopPropagation();
                }}
                onWheel={(event) => {
                    /*
                     * The Stats panel consumes the wheel
                     * event so the Tree underneath never zooms.
                     */
                    event.stopPropagation();
                }}
            >

                {/* HEADER */}

                <div className="flex items-center justify-between border-b border-slate-700/70 px-5 py-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10 text-lg text-sky-300">
                            ✦
                        </div>

                        <div>

                            <h3 className="text-lg font-bold tracking-wide text-sky-400">
                                BUILD STATS
                            </h3>

                            <p className="text-xs text-slate-500">
                                Current talent bonuses
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        aria-label="Close stats"
                    >
                        ×
                    </button>

                </div>


                {/* STATS */}

                <div className="overflow-y-auto px-5 py-4">

                    {stats.length === 0 ? (

                        <div className="py-10 text-center">

                            <div className="text-3xl text-slate-600">
                                ✦
                            </div>

                            <p className="mt-3 text-sm font-semibold text-slate-400">
                                No active bonuses
                            </p>

                            <p className="mt-1 text-xs text-slate-600">
                                Select talents to see their bonuses.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {categories.map(
                                (category) => {

                                    const categoryStats =
                                        groupedStats[
                                            category
                                        ];

                                    return (
                                        <section
                                            key={category}
                                        >

                                            {/* CATEGORY HEADER */}

                                            <div className="mb-2 flex items-center gap-2">

                                                <span className="text-sm">
                                                    {
                                                        categoryIcons[
                                                            category
                                                        ] || "✦"
                                                    }
                                                </span>

                                                <h4 className="text-xs font-bold tracking-[0.16em] text-slate-300">
                                                    {
                                                        getStatCategoryLabel(
                                                            category
                                                        )
                                                    }
                                                </h4>

                                                <div className="h-px flex-1 bg-slate-700/60" />

                                            </div>


                                            {/* STAT ROWS */}

                                            <div className="space-y-1">

                                                {categoryStats.map(
                                                    (stat) => (

                                                        <div
                                                            key={
                                                                stat.auraId
                                                            }
                                                            className="flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-sky-400/[0.04]"
                                                        >

                                                            <span className="text-sm text-slate-300">
                                                                {
                                                                    stat.name
                                                                }
                                                            </span>

                                                            <span className="ml-4 shrink-0 text-sm font-bold text-sky-300">
                                                                +
                                                                {
                                                                    formatStatValue(
                                                                        stat
                                                                    )
                                                                }
                                                            </span>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </section>
                                    );
                                }
                            )}

                        </div>

                    )}

                </div>


                {/* FOOTER */}

                <div className="border-t border-slate-700/70 px-5 py-4">

                    <div className="mb-3 flex items-center justify-between">

                        <div>
                            <span className="text-xs text-slate-500">
                                TALENTS
                            </span>

                            <div className="text-sm font-bold text-white">
                                {completedTalents}
                            </div>
                        </div>

                        <div className="text-right">

                            <span className="text-xs text-slate-500">
                                POINTS
                            </span>

                            <div className="text-sm font-bold text-white">
                                {talentPoints} / {maxPoints}
                            </div>

                        </div>

                    </div>


                    {/* POINT PROGRESS */}

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                        <div
                            className="h-full rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.45)] transition-all duration-300"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};