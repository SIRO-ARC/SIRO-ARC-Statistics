import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const phyanTree = createHero({
    iconImage: "/images/talent-builder/heroes/phyan_icon.png",
    title: "Phyan - Gluttonous Hunter",
    rarity: HeroRarity.Epic,
    categories: [HeroCategory.Gathering, HeroCategory.Water, HeroCategory.Support],
})