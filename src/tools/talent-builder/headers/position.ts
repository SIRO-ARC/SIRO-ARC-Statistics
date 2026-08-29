export type Row = "top" | "center" | "bottom";

export interface Position {
  col: number;
  row: Row;
}

const GRID = {
  colWidth: 200,
  offsetX: 50,
  rows: {
    top: 60,
    center: 260,
    bottom: 460,
  },
} as const;

export function getCoordinates(pos: Position) {
  return {
    x: GRID.offsetX + pos.col * GRID.colWidth,
    y: GRID.rows[pos.row],
  };
}