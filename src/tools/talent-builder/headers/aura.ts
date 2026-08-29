export type Aura = {
  id: number
  name: string
  effect: string
  unit?: string
  category?: AuraCategory;
}

export enum AuraCategory {
  OFFENSIVE = "Offensive",
  DEFENSIVE = "Defensive",
  HEALING = "Healing",
  GARRISON = "Garrison",
  SIEGE = "Siege",
  GATHERING = "Gathering",
  UTILITY = "Utility",
  CAPACITY = "Capacity",
  UNKNOWN = "Unknown",
}