import styled from "styled-components";

export const KeyboardWrapper = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  > .row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }
  transition: all 1s;
  transition-delay: 1s;
  transform: ${(props) =>
    props.visible ? "translateY(0%)" : "translateY(100%)"};
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

export const KeyWrapper = styled.div<{
  disabled?: boolean;
  isDarkMode: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${(props) =>
    props.isDarkMode ? "transparent" : "#d3d6da"};
  font-size: 14px;
  font-weight: 600;
  margin: 0 4px;
  user-select: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "not-allowed" : "all")};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  user-select: none;
  color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
  border: 2px solid transparent;
  border-color: ${(props) =>
    props.isDarkMode ? "rgba(255,255,255,0.2)" : "transparent"};
  &:hover {
    background-color: ${(props) =>
      !props.disabled
        ? props.isDarkMode
          ? "rgba(255,255,255,0.1)"
          : "#e9e9e9"
        : "transparent"};
  }
  &:active {
    background-color: ${(props) =>
      !props.disabled
        ? props.isDarkMode
          ? "#408544fb"
          : "#92df7e"
        : "transparent"};
  }
  min-width: 20px;
  padding: 0 8px;
  min-height: 50px;
  transition: all 0.7s;

  &.correct {
    border-color: #538d4e;
    color: #538d4e;
  }

  &.present {
    border-color: #b59f3b;
    color: #b59f3b;
  }

  &.absent {
    border-color: #bd1616;
    color: #bd1616;
  }

  /* For Desktop View */
  @media screen and (min-width: 1024px) {
    min-width: 50px;
    padding: 0 20px;
    min-height: 60px;
  }

  /* For Tablet View */
  @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    min-width: 60px;
    padding: 0 8px;
    min-height: 70px;
  }

  /* For Mobile Portrait View */
  @media screen and (max-device-width: 380px) and (orientation: portrait) {
    min-width: 18px;
    height: 40px;
    margin: 0 2px;
  }

  /* For Mobile Portrait View */
  @media screen and (min-device-width: 381px) and (max-device-width: 480px) and (orientation: portrait) {
    min-width: 18px;
    min-height: 50px;
  }

  /* For Mobile Landscape View */
  @media screen and (max-device-width: 1024px) and (orientation: landscape) {
    min-width: 50px;
    padding: 0 8px;
    min-height: 60px;
  }
`;