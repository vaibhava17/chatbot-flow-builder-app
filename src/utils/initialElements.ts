import { Node, Edge, Position } from "reactflow";

export const NodeStyles = {
  borderRadius: "8px",
  border: "1px solid white",
  cursor: "pointer",
  color: "#ffffff",
  boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
  padding: "0px",
  width: "220px",
};

export const SelectedNodeStyles = {
  borderRadius: "8px",
  border: "1px solid blue",
  cursor: "pointer",
  color: "#ffffff",
  boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
  padding: "0px",
  width: "220px",
};

export const initialNodes: Node[] = [
  {
    id: "input-1",
    type: "input",
    data: {
      label: `Send Message`,
      value: `test message 1`,
      name: "Message",
    },
    style: NodeStyles,
    position: { x: 150, y: 280 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

export const initialEdges: Edge[] = [];
