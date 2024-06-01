import React from "react";
import { MessageOutlined } from "@ant-design/icons";

interface NodeTypeItem {
  name: string;
  type: string;
  icon: React.ReactNode;
}

const nodeTypes: NodeTypeItem[] = [
  {
    name: "Message",
    type: "input",
    icon: <MessageOutlined />,
  },
];

const NodePanel: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="p-4 w-80 border-r border-gray-300 h-screen bg-gray-100">
      {nodeTypes.map((item, i) => {
        return (
          <div
            className="p-2 mb-2 bg-white border border-gray-300 cursor-grab flex flex-col items-center"
            onDragStart={(event) => onDragStart(event, item.name)}
            draggable
            key={i}
          >
            {item.icon}
            {item.name}
          </div>
        );
      })}
    </aside>
  );
};

export default NodePanel;
