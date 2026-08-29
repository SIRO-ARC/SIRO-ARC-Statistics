import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const asamiTree = createHero({
    iconImage: "/images/talent-builder/heroes/asami_icon.png",
    title: "Asami Sato - Ingenious Inventor",
    rarity: HeroRarity.Epic,
    categories: [HeroCategory.Siege, HeroCategory.Fire, HeroCategory.Attack],
})