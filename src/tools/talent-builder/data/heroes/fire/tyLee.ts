import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const tyLeeTree = createHero({
    iconImage: "/images/talent-builder/heroes/tylee_icon.png",
    title: "Ty Lee - Chi-Bocking Acrobat",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Hunt, HeroCategory.Fire, HeroCategory.Skill],
})