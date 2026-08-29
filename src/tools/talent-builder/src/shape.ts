import { Row } from "../headers/position";
import { TalentNode } from "../headers/talent";

const rowShapeMap: Record<Row, string> = {
  center: "octagon",
  top: "rectangle",
  bottom: "diamond",
}

export function getShape(talentNode: TalentNode): string {
  if (talentNode.enhanced)
    return "circle"

  return rowShapeMap[talentNode.pos.row]
}