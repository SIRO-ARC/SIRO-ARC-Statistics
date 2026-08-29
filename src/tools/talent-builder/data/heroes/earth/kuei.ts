import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const kueiTree = createHero({
    iconImage: "/images/talent-builder/heroes/kuei_icon.png",
    title: "Kuei - King of Ba Sing Se",
    rarity: HeroRarity.Rare,
    categories: [HeroCategory.Gathering, HeroCategory.Earth, HeroCategory.Support],
})