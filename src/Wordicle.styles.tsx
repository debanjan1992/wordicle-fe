import styled from "styled-components";

export const WordleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

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

export const GameGridWrapper = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s;
  transform: ${(props) =>
    props.visible ? "translateY(0%)" : "translateY(-100%)"};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition-delay: 1s;
`;

export const WordWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const HeaderWrapper = styled.header<{
  isDarkMode: boolean;
  isNewGameScreen: boolean;
}>`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  justify-content: space-between;
  border-bottom: 1px solid;
  border-color: ${(props) =>
    props.isNewGameScreen
      ? "transparent"
      : props.isDarkMode
      ? "#565758"
      : "#b9b9b9"};
  position: relative;
  transition: all 1s;
  .app-title {
    font-size: 24px;
    letter-spacing: 4px;
    color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
    font-weight: bold;
    .tag {
      font-size: 11px;
      letter-spacing: 0;
    }
    .tag.hard {
      color: crimson;
    }
  }

  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => (props.isDarkMode ? "#565758" : "#787c7e")};
  }

  /* For Desktop View */
  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    width: 50vw;
    ${(props) => (props.isNewGameScreen ? "top: 25%" : "top: 0")};
    .app-title {
      font-size: 36px;
      font-weight: 900;
      letter-spacing: 4px;
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }

  /* For Tablet View */
  @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    .app-title {
      font-size: 52px;
      font-weight: 900;
      letter-spacing: 4px;
    }
    svg {
      width: 34px;
      height: 34px;
    }
  }

  /* For Mobile Portrait View */
  @media screen and (max-device-width: 480px) and (orientation: portrait) {
    .app-title {
      font-size: ${(props) => (props.isNewGameScreen ? "40px" : "24px")};
      font-weight: 900;
      letter-spacing: 4px;
    }
    svg {
      width: 28px;
      height: 28px;
    }
  }

  /* For Mobile Landscape View */
  @media screen and (max-device-width: 1024px) and (orientation: landscape) {
    ${(props) => (props.isNewGameScreen ? "top: 45%" : "top: 0")};
    .app-title {
      font-size: 36px;
      font-weight: 900;
      letter-spacing: 4px;
    }
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const GameWrapper = styled.div<{
  isDarkMode: boolean;
  isNewGame: boolean;
}>`
  background-color: ${(props) => (props.isDarkMode ? "black" : "white")};
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  body {
    margin: 0;
    padding: 0;
    background: #000;
    overflow: hidden;
  }
`;

const getGameBoxSideForMobilePortrait = (wordLength: number): number => {
  const sideLength = window.screen.availWidth / wordLength - 14;
  if (sideLength > 60) {
    return 60;
  } else {
    return sideLength;
  }
};

export const GameBoxWrapper = styled.div<{
  isDarkMode: boolean;
  wordLength: number;
  snapshotMode?: boolean;
  isActiveBox: boolean;
}>`
  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    80% {
      transform: rotate(0deg);
    }
    85% {
      transform: rotate(5deg);
    }
    95% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  ${(props) => props.isActiveBox && "animation: wiggle 1.5s infinite;"}
  border: 2px solid transparent;
  box-sizing: border-box;
  margin: 2px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.7s ease-in-out;
  color: ${(props) => (props.isDarkMode ? "#e9e9e9" : "#3a3a3c")};
  width: 50px;
  height: 50px;
  font-size: 24px;

  &.not-filled {
    border-color: ${(props) => (props.isDarkMode ? "#3a3a3c" : "#d3d6da")};
  }

  &.filled.empty {
    @keyframes fillIn {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.05);
      }

      100% {
        transform: scale(1);
      }
    }
    border-color: ${(props) => (props.isDarkMode ? "#565758" : "#878a8c")};
    animation: fillIn 0.2s ease-in-out;
  }

  &.correct {
    background-color: #538d4e;
    border-color: #538d4e;
    color: ${(props) => (props.isDarkMode ? "#d7dadc" : "white")};
  }

  &.present {
    background-color: #b59f3b;
    border-color: #b59f3b;
    color: ${(props) => (props.isDarkMode ? "#d7dadc" : "white")};
  }

  &.absent {
    background-color: #bd1616;
    border-color: #bd1616;
    color: ${(props) => (props.isDarkMode ? "#d7dadc" : "white")};
  }

  /* For Desktop View */
  @media screen and (min-width: 1024px) {
    width: 55px;
    height: 55px;
  }

  /* For Tablet View */
  @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    width: 60px;
    height: 60px;
  }

  /* For Mobile Portrait View */
  @media screen and (max-device-width: 480px) and (orientation: portrait) {
    width: ${(props) =>
      getGameBoxSideForMobilePortrait(props.wordLength) + "px"};
    height: ${(props) =>
      getGameBoxSideForMobilePortrait(props.wordLength) + "px"};
  }

  /* For Mobile Landscape View */
  @media screen and (max-device-width: 1024px) and (orientation: landscape) {
    width: 56px;
    height: 56px;
  }
`;
