import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const irohTree = createHero({
    iconImage: "/images/talent-builder/heroes/iroh_icon.png",
    title: "Uncle Iroh - Wise Tea-Enthusiast",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Garrison, HeroCategory.Fire, HeroCategory.Defense],
})