import { TalentNode, TalentNodeTemplate } from "../headers/talent";

export function createLayout(layoutTemplate: TalentNodeTemplate[], talentIds: number[]): { layout: TalentNode[] } {

    if (layoutTemplate.length !== talentIds.length)
        throw new Error(`CreateLayout: The used layout doesn't match the Template layout.)`)

    const layout: TalentNode[] = layoutTemplate.map((node, index) => ({
        ...node,
        talentId: talentIds[index]
    }))

    return { layout }
}