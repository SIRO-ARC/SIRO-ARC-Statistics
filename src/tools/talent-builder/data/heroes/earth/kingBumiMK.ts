import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const kingBumiMKTree = createHero({
    iconImage: "/images/talent-builder/heroes/kingbumimk_icon.png",
    title: "King Bumi - Mad King",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Hunt, HeroCategory.Earth, HeroCategory.Attack],
})