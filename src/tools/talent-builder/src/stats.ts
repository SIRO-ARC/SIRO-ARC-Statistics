import { talents } from "../data/talents";
import { auras } from "../data/auras";
import { TalentNode } from "../headers/talent";

export interface CalculatedStat {
    auraId: number;
    name: string;
    value: number;
    unit?: string;
    category?: string;
}

/**
 * Calculates the total effects of all currently
 * selected talent points.
 *
 * Each talent contributes:
 *
 * modifier × selected points
 *
 * Talents using the same aura are combined.
 */
export function calculateTalentStats(
    layout: TalentNode[],
    selectedTalentNodes: Record<number, number>
): CalculatedStat[] {

    const totals: Record<number, number> = {};

    for (const talentNode of layout) {

        const selectedPoints =
            selectedTalentNodes[talentNode.id] || 0;

        if (selectedPoints <= 0) {
            continue;
        }

        const talent =
            talents[talentNode.talentId];

        if (!talent) {
            continue;
        }

        const aura =
            auras[talent.auraId];

        if (!aura) {
            continue;
        }

        const contribution =
            talent.modifier * selectedPoints;

        totals[aura.id] =
            (totals[aura.id] || 0) +
            contribution;
    }

    return Object.entries(totals)
        .map(([auraId, value]) => {

            const aura =
                auras[Number(auraId)];

            return {
                auraId: aura.id,
                name: aura.name,
                value,
                unit: aura.unit,
                category: aura.category,
            };
        })
        .sort((a, b) =>
            a.name.localeCompare(b.name)
        );
}


/**
 * Display names for the Stats Panel.
 *
 * The underlying AuraCategory values are kept
 * unchanged. These are UI-only labels.
 */
export const statCategoryLabels: Record<
    string,
    string
> = {
    OFFENSIVE: "ATTACK",
    DEFENSIVE: "DEFEND",
    UTILITY: "SPECIAL",
    CAPACITY: "CAPACITY",
    HEALING: "HEALING",
    SIEGE: "SIEGE",
    GARRISON: "GARRISON",
    GATHERING: "GATHERING",
};


/**
 * Returns the display name of an aura category.
 */
export function getStatCategoryLabel(
    category?: string
): string {

    if (!category) {
        return "SPECIAL";
    }

    return (
        statCategoryLabels[category] ||
        category
    );
}


/**
 * Groups calculated stats by their Aura category.
 */
export function groupTalentStats(
    stats: CalculatedStat[]
): Record<string, CalculatedStat[]> {

    return stats.reduce(
        (groups, stat) => {

            const category =
                stat.category ||
                "UTILITY";

            if (!groups[category]) {
                groups[category] = [];
            }

            groups[category].push(stat);

            return groups;

        },
        {} as Record<
            string,
            CalculatedStat[]
        >
    );
}