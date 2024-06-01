import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  Connection,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  initialEdges,
  NodeStyles,
  SelectedNodeStyles,
} from "../utils/initialElements";
import CustomNode from "./CustomNode";

const nodeTypes = {
  input: CustomNode,
};

interface ChatbotFlowBuilderProps {
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
  onNodeChange: (node: Node) => void;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

const ChatbotFlowBuilder: React.FC<ChatbotFlowBuilderProps> = ({
  selectedNode,
  setSelectedNode,
  onNodeChange,
  nodes,
  setNodes,
}) => {
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const nodeType = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `${nodeType.type}-${nodes.length + 1}`,
      type: nodeType.type,
      position,
      data: {
        label: "Send Message",
        value: "textNode",
        name: nodeType.name,
      },
      style: NodeStyles,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setNodes((nds) =>
      nds.map((item) => {
        if (node.id == item.id) {
          return {
            ...item,
            style: SelectedNodeStyles,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        className="w-screen"
      >
        {/* <MiniMap />
        <Controls />
        <Background /> */}
      </ReactFlow>
    </>
  );
};

export default ChatbotFlowBuilder;
