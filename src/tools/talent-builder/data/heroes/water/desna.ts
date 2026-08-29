import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const desnaTree = createHero({
    iconImage: "/images/talent-builder/heroes/desna_icon.png",
    title: "Desna & Eska - Stoic Twins",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Versatile, HeroCategory.Water, HeroCategory.Skill],
})