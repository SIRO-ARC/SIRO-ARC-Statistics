import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const zaheerTree = createHero({
    iconImage: "/images/talent-builder/heroes/zaheer_icon.png",
    title: "Zaheer - Red Lotus Leader",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Air, HeroCategory.Skill],
})