import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const makoTree = createHero({
    iconImage: "/images/talent-builder/heroes/mako_icon.png",
    title: "Mako - Streetwise Cop",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Hunt, HeroCategory.Fire, HeroCategory.Skill],
})