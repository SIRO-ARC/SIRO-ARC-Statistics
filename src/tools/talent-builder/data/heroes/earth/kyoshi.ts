import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const kyoshiTree = createHero({
    iconImage: "/images/talent-builder/heroes/kyoshi_icon.png",
    title: "Kyoshi - Earth Splitter",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Versatile, HeroCategory.Earth, HeroCategory.Avatar],
})