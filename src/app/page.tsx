"use client";
import { useState } from "react";
import ChatbotFlowBuilder from "@/components/ChatbotFlowBuilder";
import Header from "@/components/Header";
import NodePanel from "@/components/NodePanel";
import SettingsPanel from "@/components/SettingsPanel";
import { ReactFlowProvider } from "reactflow";
import { Node } from "reactflow";
import { initialNodes, NodeStyles } from "../utils/initialElements";
import clsx from "clsx";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [alertMessage, setMessage] = useState<string | null>(null);
  const [hasAllEdges, setHasAllEdges] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (!hasAllEdges) {
      setMessage("Error: Cannot save flow");
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
      setMessage("Success: Flow saved successfully");
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
              setSelectedNode={setSelectedNode}
              nodes={nodes}
              setNodes={setNodes}
              setHasAllEdges={setHasAllEdges}
              setMessage={setMessage}
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
        {alertMessage && (
          <div
            className={clsx(
              "absolute bottom-4 left-4 p-2 text-white rounded",
              alertMessage.includes("Error") && "bg-red-500",
              alertMessage.includes("Success") && "bg-sky-500"
            )}
          >
            {alertMessage}
          </div>
        )}
      </main>
    </ReactFlowProvider>
  );
}
