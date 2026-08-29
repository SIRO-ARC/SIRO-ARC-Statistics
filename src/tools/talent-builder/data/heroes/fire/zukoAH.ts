import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const zukoAHTree = createHero({
    iconImage: "/images/talent-builder/heroes/zukoah_icon.png",
    title: "Zuko - Avatar Hunter",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Fire, HeroCategory.Attack],
})