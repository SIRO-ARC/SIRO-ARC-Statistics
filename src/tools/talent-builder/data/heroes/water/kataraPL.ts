import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const kataraPLTree = createHero({
    iconImage: "/images/talent-builder/heroes/katarapl_icon.png",
    title: "Katara - Painted Lady",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Garrison, HeroCategory.Water, HeroCategory.Support],
})