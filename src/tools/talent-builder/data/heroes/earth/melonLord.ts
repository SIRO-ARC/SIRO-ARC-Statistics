import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const melonLordTree = createHero({
    iconImage: "/images/talent-builder/heroes/melonlord_icon.png",
    title: "Melon Lord - Tasty Tyrant",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Earth, HeroCategory.Support],
})