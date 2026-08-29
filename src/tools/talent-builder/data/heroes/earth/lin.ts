import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const linTree = createHero({
    iconImage: "/images/talent-builder/heroes/lin_icon.png",
    title: "Lin Beifong - Chief of Police",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Garrison, HeroCategory.Earth, HeroCategory.Mobility],
})