import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const ozaiTree = createHero({
    iconImage: "/images/talent-builder/heroes/ozai_icon.png",
    title: "Ozai - Phoenix King",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Fire, HeroCategory.Skill],
})