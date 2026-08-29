import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const kuviraTree = createHero({
    iconImage: "/images/talent-builder/heroes/kuvira_icon.png",
    title: "Kuvira - Metalbending Expert",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Earth, HeroCategory.Attack],
})