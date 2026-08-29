import { auras } from "../data/auras";
import { talents } from "../data/talents";
import { AuraCategory } from "../headers/aura";
import { TalentNode } from "../headers/talent";

export type GroupedAuraStats = Record<AuraCategory,
    {
        auraId: number;
        name: string;
        value: number;
        text: string;
    }[]>;

export function calculateAuraStats({ selectedTalentNodes, layout }: { selectedTalentNodes: Record<number, number>, layout: TalentNode[] }) {
    const auraTotals: Record<number, number> = {};

    const nodeMap: Record<number, TalentNode> = Object.fromEntries( //to reduce iterations, during testing that helped
        layout.map((n) => [n.id, n])
    );

    for (const talentNodeId in selectedTalentNodes) {
        const nodeId = Number(talentNodeId);
        const points = selectedTalentNodes[nodeId];
        if (!points || points <= 0) 
            continue;

        const node = nodeMap[nodeId]; //replaced by nodeMap const, find() was way too inefficient to be used
        if (!node) 
            continue;

        const talent = talents[node.talentId];
        if (!talent) 
            continue;

        const auraId = talent.auraId;
        const value = talent.modifier * points;

        if (!auraTotals[auraId]) 
            auraTotals[auraId] = 0;

        auraTotals[auraId] += value;
    }

    const grouped: GroupedAuraStats = Object.values(AuraCategory).reduce(
        (acc, category) => {
            acc[category] = [];
            return acc;
        },
        {} as GroupedAuraStats
    );

    for (const [auraIdStr, totalValue] of Object.entries(auraTotals)) {
        const auraId = Number(auraIdStr);
        const aura = auras[auraId];
        if (!aura) continue;

        const category = aura.category ?? AuraCategory.UNKNOWN;

        const text = aura.effect.replace("{value}", String(totalValue));

        grouped[category].push({
            auraId,
            name: aura.name,
            value: totalValue,
            text,
        });
    }

    return grouped;
}
