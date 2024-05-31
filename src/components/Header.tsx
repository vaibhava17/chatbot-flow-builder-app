import React from "react";
import CustomButton from "@/components/CustomButton";

interface HeaderProps {
  label: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  label,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b w-screen">
      <h1 className="text-2xl font-normal">{label}</h1>
      <CustomButton onClick={onButtonClick}>{buttonLabel}</CustomButton>
    </header>
  );
};

export default Header;
