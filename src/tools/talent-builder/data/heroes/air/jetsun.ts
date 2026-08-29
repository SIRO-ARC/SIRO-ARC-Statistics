import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const jetsunTree = createHero({
    iconImage: "/images/talent-builder/heroes/jetsun_icon.png",
    title: "Jetsun - Light of the Mist",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Versatile, HeroCategory.Air, HeroCategory.Attack],
})