import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const aangFNTree = createHero({
    iconImage: "/images/talent-builder/heroes/aangfn_icon.png",
    title: "Aang - Fire Nation",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Air, HeroCategory.Mobility],
})