import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { MessageOutlined } from "@ant-design/icons";

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <>
      <div
        className="text-black p-2 flex justify-between items-center rounded-t-lg"
        style={{
          backgroundColor: "#00FFFF50",
        }}
      >
        <span>{data.label}</span>
        <MessageOutlined className="text-black" />
      </div>
      <div className="p-2 rounded-b-lg text-black text-start">{data.value}</div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </>
  );
};

export default CustomNode;
