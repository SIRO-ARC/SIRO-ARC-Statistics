import { Position } from "./position"

export type Talent = {
  id: number
  title: string
  maxPoints: number
  modifier: number
  auraId: number
  image?: string
}

export type TalentNode = {
  id: number
  pos: Position;
  requires?: number[]
  requiresAny?: number[]
  connectsTo?: number[]
  enhanced?: boolean
  talentId: number

}

export type TalentNodeTemplate = {
  id: number
  pos: Position
  requires?: number[]
  requiresAny?: number[]
  connectsTo?: number[]
  enhanced?: boolean
}