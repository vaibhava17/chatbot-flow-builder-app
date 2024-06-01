import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
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
import { clearAlertWithDelay } from "@/utils/helper";

const nodeTypes = {
  input: CustomNode,
};

interface ChatbotFlowBuilderProps {
  setSelectedNode: (node: Node | null) => void;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setHasAllEdges: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChatbotFlowBuilder: React.FC<ChatbotFlowBuilderProps> = ({
  setSelectedNode,
  nodes,
  setNodes,
  setHasAllEdges,
  setMessage,
}) => {
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // This useEffect hook is checking if all nodes have edges connected to their target positions.
  // If the node with ID "input-1" is encountered, it is considered to have an edge, as it is the starting node and checks for each node 
  // if there is at least one edge connected to the target position. And updates the state variable hasAllEdges.
  useEffect(() => {
    const allNodesHaveEdges = nodes.every((node) => {
      if (node.id == "input-1") return true;
      else return edges.some((edge) => edge.target === node.id);
    });
    setHasAllEdges(allNodesHaveEdges);
  }, [nodes, edges, setHasAllEdges]);

  // This useCallback hook creates a memoized callback function for handling changes to the nodes in the React Flow component.
  // It uses the applyNodeChanges function to apply the changes to the nodes array and updates the state accordingly.
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // This useCallback hook creates a memoized callback function for handling changes to the edges in the React Flow component.
  // It uses the applyEdgeChanges function to apply the changes to the edges array and updates the state accordingly.
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // This useCallback hook checks if a node already has an outgoing edge, and if so, it sets an error message.
  // Otherwise, it adds the new edge to the edges array and updates the state accordingly.
  const onConnect = useCallback(
    (params: Edge<any> | Connection) => {
      const { source } = params;

      if (source && edges.some((edge) => edge.source === source)) {
        setMessage("Error: A node can only have one outgoing edge.");
        clearAlertWithDelay(setMessage);
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setHasAllEdges]
  );

  // This function handles the drag over event when a draggable item is dragged over the React Flow component.
  // It prevents the default behavior of the drag event and sets the drop effect to "move" to indicate that the item can be moved.
  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // This function handles the drop event when a draggable item is dropped onto the React Flow component.
  // It retrieves the dragged node type and position information,
  // creates a new node object with the provided data, and adds it to the nodes array.
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

  // This function handles the click event on a node. It select the node and updates its style to indicate selection (SelectedNodeStyles).
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
    />
  );
};

export default ChatbotFlowBuilder;
