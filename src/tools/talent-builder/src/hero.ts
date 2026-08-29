import { starting } from "../data/categories/starting";
import { HeroCategory, HeroRarity, HeroTree } from "../headers/hero";
import { TalentNode } from "../headers/talent";
import { getBackground } from "../data/background";
import { categoryMapping } from "../data/category";

export function buildTalents(categories: HeroCategory[]): TalentNode[] {
    return [
        ...starting.layout,
        ...categories.flatMap(c => categoryMapping[c]?.layout ?? [])
    ]
}

export function createHero(config: { iconImage: string, title: string, rarity: HeroRarity, categories: HeroCategory[]}): HeroTree {
  return {
    ...config,
    backgroundImage: getBackground(config.categories),
    layout: buildTalents(config.categories)
  }
}

export const MAXPOINTS = 89
const BASE_LEVEL_POINTS = 9
const FRAGMENTS_PER_STAR = 5
const LEVEL_POINTS_PER_STAR = 10
const MAX_STARS = 6

const FRAGMENT_SHARD_COST = [
    [1,1,1,2,3],  // star 1
    [3,3,3,5,8],  // star 2
    [8,8,8,12,20],  // star 3
    [20,20,20,30,50],  // star 4
    [50,50,50,60,80],  // star 5
    [80,80,80,80,120],  // star 6
]

export function getHeroStars(talentPoints: number): number {

    let remaining = talentPoints - BASE_LEVEL_POINTS
    
    if (remaining <= 0) 
        return 0

    let stars = 0

    while (remaining >= FRAGMENTS_PER_STAR && stars < MAX_STARS) {

        remaining -= FRAGMENTS_PER_STAR
        stars++

        if (stars === MAX_STARS)
            return MAX_STARS

        if (remaining < LEVEL_POINTS_PER_STAR)
            return stars

        remaining -= LEVEL_POINTS_PER_STAR
    }

    return stars
}

export function getHeroFragments(talentPoints: number): number {

    const stars = getHeroStars(talentPoints)

    if (stars === MAX_STARS)
        return 0

    let remaining = talentPoints - BASE_LEVEL_POINTS

    for (let i = 0; i < stars; i++) {
        remaining -= FRAGMENTS_PER_STAR
        remaining -= LEVEL_POINTS_PER_STAR
    }

    return Math.min(Math.max(remaining, 0), FRAGMENTS_PER_STAR - 1)
}


export function getShardCost(talentPoints: number): number {

    const stars = getHeroStars(talentPoints)
    const fragments = getHeroFragments(talentPoints)

    let shards = 0

    for (let s = 0; s < stars; s++) {
        shards += FRAGMENT_SHARD_COST[s].reduce((a,b)=>a+b,0)
    }

    if (stars < MAX_STARS) {
        for (let f = 0; f < fragments; f++) {
            shards += FRAGMENT_SHARD_COST[stars][f]
        }
    }

    return shards
}