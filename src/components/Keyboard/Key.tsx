import React from "react";
import ConfigContext from "../../config/ConfigContext";
import { KeyWrapper } from "./Keyboard.styles";
import { KeyProps } from "./Keyboard.types";

const Key = ({ children, disabled, colorCode, onClick }: KeyProps) => {
  const isDarkMode = React.useContext(ConfigContext).darkMode;

  return (
    <KeyWrapper
      className={colorCode || ""}
      disabled={disabled}
      onClick={() => {
        !disabled && onClick();
      }}
      isDarkMode={isDarkMode}
    >
      <span>{children}</span>
    </KeyWrapper>
  );
};

export default Key;
