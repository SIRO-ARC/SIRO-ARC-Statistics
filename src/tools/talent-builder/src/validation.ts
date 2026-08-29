import { talents } from "../data/talents"
import { TalentNode } from "../headers/talent"

export function validateTalents(selectedTalents: Record<number, number>, layout: TalentNode[]): Record<number, number> {
    for (const talentNode of layout) {
        if ((selectedTalents[talentNode.id] || 0) <= 0)
            continue

        const isRequiredAllowed = !talentNode.requires || talentNode.requires.every((requiredTalentNodeId: number) => {
            const requiredTalentNode = layout.find(talentNode => talentNode.id === requiredTalentNodeId)

            if (!requiredTalentNode)
                return false

            const talent = talents[requiredTalentNode.talentId]

            return (selectedTalents[requiredTalentNode.id] || 0) === (talent.maxPoints || 1)
        })

        const isRequiredAnyAllowed = !talentNode.requiresAny || talentNode.requiresAny.some((requiredTalentNodeId: number) => {
            const requiredTalentNode = layout.find(talentNode => talentNode.id === requiredTalentNodeId)
            if (!requiredTalentNode)
                return false

            const talent = talents[requiredTalentNode.talentId]
            return (selectedTalents[requiredTalentNode.id] || 0) === (talent.maxPoints || 1)
        })

        const isOverMaxPoints = selectedTalents[talentNode.id] > (talents[talentNode.talentId]?.maxPoints || 1);

        if (!(isRequiredAllowed && isRequiredAnyAllowed && !isOverMaxPoints))
            return Object.fromEntries(layout.map(talentNode => [talentNode.id, 0])) // Reset
    }

    return selectedTalents
}