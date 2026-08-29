import { attack } from "./categories/attack"
import { water } from "./categories/water"
import { siege } from "./categories/siege"
import { versatile } from "./categories/versatile"
import { avatar } from "./categories/avatar"
import { gathering } from "./categories/gathering"
import { support } from "./categories/support"
import { hunt } from "./categories/hunt"
import { fire } from "./categories/fire"
import { garrison } from "./categories/garrison"
import { defense } from "./categories/defense"
import { earth } from "./categories/earth"
import { mobility } from "./categories/mobility"
import { skill } from "./categories/skill"
import { air } from "./categories/air"
import { HeroCategory } from "../headers/hero"
import { TalentNode } from "../headers/talent"

export const categoryMapping: Partial<Record<HeroCategory, { layout: TalentNode[] }>> = {
  [HeroCategory.Fire]: fire,
  [HeroCategory.Water]: water,
  [HeroCategory.Earth]: earth,
  [HeroCategory.Air]: air,
  [HeroCategory.Attack]: attack,
  [HeroCategory.Siege]: siege,
  [HeroCategory.Versatile]: versatile,
  [HeroCategory.Avatar]: avatar,
  [HeroCategory.Gathering]: gathering,
  [HeroCategory.Support]: support,
  [HeroCategory.Hunt]: hunt,
  [HeroCategory.Garrison]: garrison,
  [HeroCategory.Defense]: defense,
  [HeroCategory.Mobility]: mobility,
  [HeroCategory.Skill]: skill,
}

export const categoryIcons: Partial<Record<HeroCategory, string>> = {
  [HeroCategory.Fire]: "/images/talent-builder/categories/fire.png",
  [HeroCategory.Water]: "/images/talent-builder/categories/water.png",
  [HeroCategory.Earth]: "/images/talent-builder/categories/earth.png",
  [HeroCategory.Air]: "/images/talent-builder/categories/air.png",
  [HeroCategory.Attack]: "/images/talent-builder/categories/attack.png",
  [HeroCategory.Siege]: "/images/talent-builder/categories/siege.png",
  [HeroCategory.Versatile]: "/images/talent-builder/categories/versatile.png",
  [HeroCategory.Avatar]: "/images/talent-builder/categories/avatar.png",
  [HeroCategory.Gathering]: "/images/talent-builder/categories/gathering.png",
  [HeroCategory.Support]: "/images/talent-builder/categories/support.png",
  [HeroCategory.Hunt]: "/images/talent-builder/categories/hunt.png",
  [HeroCategory.Garrison]: "/images/talent-builder/categories/garrison.png",
  [HeroCategory.Defense]: "/images/talent-builder/categories/defense.png",
  [HeroCategory.Mobility]: "/images/talent-builder/categories/mobility.png",
  [HeroCategory.Skill]: "/images/talent-builder/categories/skill.png",
};