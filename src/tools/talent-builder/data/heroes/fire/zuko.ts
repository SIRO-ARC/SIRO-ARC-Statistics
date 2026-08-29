import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const zukoTree = createHero({
    iconImage: "/images/talent-builder/heroes/zuko_icon.png",
    title: "Zuko - Exiled Fire Prince",
    rarity: HeroRarity.Epic,
    categories: [HeroCategory.Versatile, HeroCategory.Fire, HeroCategory.Attack],
})