import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const tophTree = createHero({
    iconImage: "/images/talent-builder/heroes/toph_icon.png",
    title: "Toph - The Blind Bandit",
    rarity: HeroRarity.Epic,
    categories: [HeroCategory.Versatile, HeroCategory.Earth, HeroCategory.Skill],
})