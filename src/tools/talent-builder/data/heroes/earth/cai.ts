import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const caiTree = createHero({
    iconImage: "/images/talent-builder/heroes/cai_icon.png",
    title: "Cai - Cabbage Merchant",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Gathering, HeroCategory.Earth, HeroCategory.Support],
})