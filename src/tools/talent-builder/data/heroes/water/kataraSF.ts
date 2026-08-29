import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const kataraSFTree = createHero({
    iconImage: "/images/talent-builder/heroes/katarasf_icon.png",
    title: "Katara - Sapphire Fire",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Water, HeroCategory.Skill],
})