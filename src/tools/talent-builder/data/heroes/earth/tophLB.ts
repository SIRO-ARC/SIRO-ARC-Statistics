import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const tophLBTree = createHero({
    iconImage: "/images/talent-builder/heroes/tophlb_icon.png",
    title: "Toph - Lady Beifong",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Earth, HeroCategory.Attack],
})