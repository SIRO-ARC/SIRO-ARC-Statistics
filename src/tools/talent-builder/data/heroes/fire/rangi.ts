import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const rangiTree = createHero({
    iconImage: "/images/talent-builder/heroes/rangi_icon.png",
    title: "Rangi - The Loyal Flame",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Fire, HeroCategory.Attack],
})