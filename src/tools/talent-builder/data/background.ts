import { HeroCategory } from "../headers/hero";

export const categoryBackgrounds: Partial<Record<HeroCategory, string>> = {
  [HeroCategory.Fire]: "/images/talent-builder/backgrounds/fire_tree_bg.png",
  [HeroCategory.Water]: "/images/talent-builder/backgrounds/water_tree_bg.png",
  [HeroCategory.Earth]: "/images/talent-builder/backgrounds/earth_tree_bg.png",
  [HeroCategory.Air]: "/images/talent-builder/backgrounds/air_tree_bg.png",
};

export function getBackground(categories: HeroCategory[]): string {
  const match = categories.find((cat) => categoryBackgrounds[cat]);
  return match
    ? categoryBackgrounds[match]!
    : "/images/talent-builder/backgrounds/water_tree_bg.png";
}
