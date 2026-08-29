import { TalentNode } from "../../headers/talent";

export const starting = {
    layout: [
        // Tier 0 nodes
        {
            id: 1,
            pos: { col: 0, row: "center" },
            talentId: 6,
        },

        // Tier 1 nodes
        {
            id: 2,
            pos: { col: 1, row: "center" },
            requires: [1],
            talentId: 1
        },
        {
            id: 5,
            pos: { col: 2, row: "center" },
            requires: [2],
            talentId: 2
        },
        {
            id: 6,
            pos: { col: 3, row: "center" },
            requires: [5],
            talentId: 3
        },

        // Tier 2 nodes
        {
            id: 9,
            pos: { col: 4, row: "center" },
            requiresAny: [4, 6, 8],
            talentId: 4,
            enhanced: true
        },
        {
            id: 12,
            pos: { col: 5, row: "center" },
            requires: [9],
            talentId: 5
        },
        {
            id: 13,
            pos: { col: 6, row: "center" },
            requires: [12],
            talentId: 74
        },

        // Tier 3 nodes

        {
            id: 20,
            pos: { col: 8, row: "center" },
            requires: [16],
            talentId: 2
        },
        {
            id: 21,
            pos: { col: 9, row: "center" },
            requires: [20],
            talentId: 14
        },
        {
            id: 22,
            pos: { col: 10, row: "center" },
            requires: [21],
            talentId: 3
        }
    ] satisfies TalentNode[]
};