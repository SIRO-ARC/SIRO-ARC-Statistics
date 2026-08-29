import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const rokuTree = createHero({
    iconImage: "/images/talent-builder/heroes/roku_icon.png",
    title: "Roku - Wise Avatar",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Versatile, HeroCategory.Fire, HeroCategory.Avatar],
})