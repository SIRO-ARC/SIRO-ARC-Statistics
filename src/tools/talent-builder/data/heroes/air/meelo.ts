import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const meeloTree = createHero({
    iconImage: "/images/talent-builder/heroes/meelo_icon.png",
    title: "Meelo - Master Fartbender",
    rarity: HeroRarity.Rare,
    categories: [HeroCategory.Gathering, HeroCategory.Air, HeroCategory.Mobility],
})