// GroupedStatsPanel.tsx
import { useState } from "react";
import { AuraCategory } from "../headers/aura";
import { GroupedAuraStats } from "./calculateStats";

type Props = {
    stats: GroupedAuraStats;
};

export function WriteStats({ stats }: Props) {
    const [openCategories, setOpenCategories] = useState<Record<AuraCategory, boolean>>(
        Object.values(AuraCategory).reduce((acc, cat) => {
            if ((stats[cat] ?? []).length > 0) acc[cat] = true;
            return acc;
        }, {} as Record<AuraCategory, boolean>)
    );

    const toggleCategory = (category: AuraCategory) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <div className="flex-1 overflow-y-auto pr-2">
            <div className="flex flex-col gap-3 text-sm">
                {Object.entries(stats)
                    .filter(([_, values]) => values.length > 0)
                    .map(([categoryStr, values]) => {
                        const category = categoryStr as AuraCategory;
                        const isOpen = openCategories[category] ?? true;

                        return (
                            <div key={category}>
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full flex justify-between items-center text-left font-semibold text-white/90 hover:text-white"
                                >
                                    <span>{category} ({values.length})</span>
                                    <span>{isOpen ? "−" : "+"}</span>
                                </button>

                                {isOpen && (
                                    <div className="mt-2 ml-3 flex flex-col gap-1 text-white/80">
                                        {values.map((stat) => (
                                            <p key={stat.auraId}>- {stat.text}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}