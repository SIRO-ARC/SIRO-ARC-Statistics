import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const yueTree = createHero({
    iconImage: "/images/talent-builder/heroes/yue_icon.png",
    title: "Yue - Moon Princess",
    rarity: HeroRarity.Rare,
    categories: [HeroCategory.Gathering, HeroCategory.Water, HeroCategory.Support],
})