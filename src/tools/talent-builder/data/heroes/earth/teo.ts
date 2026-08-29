import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const teoTree = createHero({
    iconImage: "/images/talent-builder/heroes/teo_icon.png",
    title: "Teo - Air Walker",
    rarity: HeroRarity.Epic,
    categories: [HeroCategory.Siege, HeroCategory.Earth, HeroCategory.Mobility],
})