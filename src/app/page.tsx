"use client";
import ChatbotFlowBuilder from "@/components/ChatbotFlowBuilder";
import Header from "@/components/Header";
import { ReactFlowProvider } from "reactflow";

export default function Home() {
  const handleButtonClick = () => {
    alert("Save button clicked!");
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
          <div className="w-full">
            <ChatbotFlowBuilder />
          </div>
          <div>side bar</div>
        </div>
      </main>
    </ReactFlowProvider>
  );
}
