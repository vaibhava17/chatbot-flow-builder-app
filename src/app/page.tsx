'use client';
import Header from "@/components/Header";

export default function Home() {
  const handleButtonClick = () => {
    alert("Save button clicked!");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header
        label="Chatbot Flow Builder"
        buttonLabel="Save Changes"
        onButtonClick={handleButtonClick}
      />
    </main>
  );
}
