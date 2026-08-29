import { TalentNodeTemplate } from "../headers/talent";

export const topLayout: TalentNodeTemplate[] = [
  // Tier 1
  {
    id: 3,
    pos: { col: 2, row: "top" },
    requires: [2]
  },
  {
    id: 4,
    pos: { col: 3, row: "top" },
    requires: [3]
  },

  // Tier 2
  {
    id: 10,
    pos: { col: 5, row: "top" },
    requires: [9]
  },
  {
    id: 11,
    pos: { col: 6, row: "top" },
    requires: [10]
  },

  // Tier 3
  {
    id: 17,
    pos: { col: 8, row: "top" },
    requires: [16]
  },
  {
    id: 18,
    pos: { col: 9, row: "top" },
    requires: [17]
  },
  {
    id: 19,
    pos: { col: 10, row: "top" },
    requires: [18]
  },

  // Tier 4
  {
    id: 27,
    pos: { col: 12, row: "top" },
    requires: [26]
  },
  {
    id: 28,
    pos: { col: 13, row: "top" },
    requires: [27]
  },
  {
    id: 29,
    pos: { col: 14, row: "top" },
    requires: [28],
    enhanced: true
  }
]

export const centerLayout: TalentNodeTemplate[] = [
  {
    id: 16,
    pos: { col: 7, row: "center" },
    requiresAny: [11, 13, 15],
    enhanced: true
  },
  {
    id: 26,
    pos: { col: 11, row: "center" },
    requiresAny: [19, 22, 25],
    enhanced: true
  },
  {
    id: 30,
    pos: { col: 12, row: "center" },
    requires: [26]
  },
  {
    id: 31,
    pos: { col: 13, row: "center" },
    requires: [30]
  },
  {
    id: 32,
    pos: { col: 14, row: "center" },
    requires: [31],
    enhanced: true
  }
]

export const bottomLayout: TalentNodeTemplate[] = [
  // Tier 1
  {
    id: 7,
    pos: { col: 2, row: "bottom" },
    requires: [2]
  },
  {
    id: 8,
    pos: { col: 3, row: "bottom" },
    requires: [7]
  },

  // Tier 2
  {
    id: 14,
    pos: { col: 5, row: "bottom" },
    requires: [9]
  },
  {
    id: 15,
    pos: { col: 6, row: "bottom" },
    requires: [14]
  },

  // Tier 3
  {
    id: 23,
    pos: { col: 8, row: "bottom" },
    requires: [16]
  },
  {
    id: 24,
    pos: { col: 9, row: "bottom" },
    requires: [23]
  },
  {
    id: 25,
    pos: { col: 10, row: "bottom" },
    requires: [24]
  },

  // Tier 4
  {
    id: 33,
    pos: { col: 12, row: "bottom" },
    requires: [26]
  },
  {
    id: 34,
    pos: { col: 13, row: "bottom" },
    requires: [33]
  },
  {
    id: 35,
    pos: { col: 14, row: "bottom" },
    requires: [34],
    enhanced: true
  }
]