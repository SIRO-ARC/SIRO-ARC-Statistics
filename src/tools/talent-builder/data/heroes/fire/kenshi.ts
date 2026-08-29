import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const kenshiTree = createHero({
    iconImage: "/images/talent-builder/heroes/kenshi_icon.png",
    title: "Kenshi - Rational Flame",
    rarity: HeroRarity.Epic,
    categories: [HeroCategory.Hunt, HeroCategory.Fire, HeroCategory.Attack],
})