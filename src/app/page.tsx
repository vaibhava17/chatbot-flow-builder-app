"use client";
import { useState } from "react";
import ChatbotFlowBuilder from "@/components/ChatbotFlowBuilder";
import Header from "@/components/Header";
import NodePanel from "@/components/NodePanel";
import SettingsPanel from "@/components/SettingsPanel";
import { ReactFlowProvider } from "reactflow";
import { Node } from "reactflow";
import { initialNodes, NodeStyles } from "../utils/initialElements";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = () => {
    const nodesWithEmptyTargets = nodes.filter((node) => !node.targetPosition);
    if (nodesWithEmptyTargets.length > 0) {
      setError("Error: Node has empty target handles.");
    } else {
      setNodes((nds) =>
        nds.map((item) => {
          if (selectedNode && selectedNode.id == item.id) {
            return {
              ...item,
              style: NodeStyles,
            };
          } else {
            return item;
          }
        })
      );
      setError(null);
      setSelectedNode(null);
    }
  };

  const handleNodeChange = (updatedNode: Node) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === updatedNode.id ? { ...node, data: updatedNode.data } : node
      )
    );
    setSelectedNode(updatedNode);
  };

  const handleBackButtonClick = () => {
    setNodes((nds) =>
      nds.map((item) => {
        if (selectedNode && selectedNode.id == item.id) {
          return {
            ...item,
            style: NodeStyles,
          };
        } else {
          return item;
        }
      })
    );
    setSelectedNode(null);
  };
  return (
    <ReactFlowProvider>
      <main className="flex flex-col items-center h-screen">
        <Header
          label="Chatbot Flow Builder"
          buttonLabel="Save Changes"
          onButtonClick={handleButtonClick}
        />
        <div className="flex flex-row w-full h-full">
          <div className="w-full h-full">
            <ChatbotFlowBuilder
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              onNodeChange={handleNodeChange}
              nodes={nodes}
              setNodes={setNodes}
            />
          </div>
          <div className="w-80 p-4 border-l border-gray-300 h-screen bg-gray-100">
            {selectedNode ? (
              <SettingsPanel
                selectedNode={selectedNode}
                onNodeChange={handleNodeChange}
                onBackButtonClick={handleBackButtonClick}
              />
            ) : (
              <NodePanel />
            )}
          </div>
        </div>
        {error && (
          <div className="absolute bottom-4 left-4 p-2 bg-red-500 text-white rounded">
            {error}
          </div>
        )}
      </main>
    </ReactFlowProvider>
  );
}
