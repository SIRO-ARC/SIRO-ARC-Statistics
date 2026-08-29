import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const piandaoTree = createHero({
    iconImage: "/images/talent-builder/heroes/piandao_icon.png",
    title: "Piandao - Master Swordsmith",
    rarity: HeroRarity.Rare,
    categories: [HeroCategory.Gathering, HeroCategory.Fire, HeroCategory.Attack],
})