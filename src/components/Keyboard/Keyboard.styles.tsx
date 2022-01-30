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
    props.isDarkMode ? "rgba(255,255,255,0.2)" : "#d3d6da"};
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
          ? "#9bb7dbfa"
          : "#b5cbe7f9"
        : "transparent"};
  }
  min-width: 20px;
  padding: 0 8px;
  min-height: 50px;
  transition: all 0.7s;

  &.correct {
    color: ${props => props.isDarkMode ? "#7A9D2F" : "#17B814"};
    border-color: ${props => props.isDarkMode ? "#7A9D2F" : "#17B814"};
  }

  &.present {
    color: ${props => props.isDarkMode ? "#B6A102" : "#F6CD13"};
    border-color: ${props => props.isDarkMode ? "#B6A102" : "#F6CD13"};
  }

  &.absent {
    color: ${props => props.isDarkMode ? "#B22B06" : "#DC3318"};
    border-color: ${props => props.isDarkMode ? "#B22B06" : "#DC3318"};
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