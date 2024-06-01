import { Node, Edge, Position } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Text Node" },
    position: { x: 150, y: 280 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

export const initialEdges: Edge[] = [];
