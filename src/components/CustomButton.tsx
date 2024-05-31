import React, { ReactNode } from "react";
import { Button, ButtonProps } from "antd";
import clsx from "clsx";

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <Button
      className={clsx(
        "bg-blue-500 hover:bg-blue-700 text-white font-normal rounded",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
