"use client";
import { useState } from "react";
import ChatbotFlowBuilder from "@/components/ChatbotFlowBuilder";
import Header from "@/components/Header";
import NodePanel from "@/components/NodePanel";
import SettingsPanel from "@/components/SettingsPanel";
import { ReactFlowProvider } from "reactflow";
import { Node } from "reactflow";
import { initialNodes, NodeStyles } from "@/utils/initialElements";
import clsx from "clsx";
import { clearAlertWithDelay } from "@/utils/helper";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [alertMessage, setMessage] = useState<string | null>(null);
  const [hasAllEdges, setHasAllEdges] = useState<boolean>(false);

  // This function handles the click event of the Save button in Header component.
  // It first checks if all nodes have edges connected to their target positions. If not, it sets an error message.
  // Otherwise, it calls unSelectNode function, sets a success message and utilizes the clearAlertWithDelay function to clear the message.
  const handleSaveButtonClick = () => {
    if (!hasAllEdges) {
      setMessage("Error: Cannot save flow");
      clearAlertWithDelay(setMessage);
    } else {
      unSelectNode();
      setMessage("Success: Flow saved successfully");
      clearAlertWithDelay(setMessage);
    }
  };

  // This function is responsible for updating the data value of the selected node when changes occur in the input field within the SettingsPanel component.
  // It takes the updated node object as input, finds the corresponding node in the nodes array, and replaces its data with the updated data.
  const handleNodeChange = (updatedNode: Node) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === updatedNode.id ? { ...node, data: updatedNode.data } : node
      )
    );
    setSelectedNode(updatedNode);
  };

  // This function calls unSelectNode when the back button is clicked in the SettingsPanel component.
  const handleBackButtonClick = () => {
    unSelectNode();
  };

  // This helper function is used internally to unselect the currently selected node.
  // It also resets the style of the selected node to the default style (NodeStyles).
  const unSelectNode = () => {
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
          onButtonClick={handleSaveButtonClick}
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
