import { LeftOutlined } from "@ant-design/icons";
import { Input, Typography } from "antd";
import React from "react";
import { Node } from "reactflow";

interface SettingsPanelProps {
  selectedNode: Node | null;
  onNodeChange: (node: Node) => void;
  onBackButtonClick: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onNodeChange,
  onBackButtonClick,
}) => {
  if (!selectedNode) {
    return <>Select a node to see its settings.</>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBackButtonClick} className="back-button">
          <LeftOutlined />
        </button>
        <div className="w-full text-center">{selectedNode.data.name}</div>
      </div>
      <div className="flex flex-col">
        <Typography.Title level={5}>Text:</Typography.Title>
        <Input.TextArea
          value={selectedNode.data.value}
          onChange={(e) =>
            onNodeChange({
              ...selectedNode,
              data: { ...selectedNode.data, value: e.target.value },
            })
          }
          autoSize
        />
      </div>
    </>
  );
};

export default SettingsPanel;
