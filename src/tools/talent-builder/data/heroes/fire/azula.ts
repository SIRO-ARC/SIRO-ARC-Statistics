import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const azulaTree = createHero({
    iconImage: "/images/talent-builder/heroes/azula_icon.png",
    title: "Azula - Fire Princess",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Fire, HeroCategory.Attack],
})