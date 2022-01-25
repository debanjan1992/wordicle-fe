import styled from "styled-components";

export const WordWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
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

const getGameBoxSideForMobilePortrait = (wordLength: number): number => {
  const sideLength = window.screen.availWidth / wordLength - 14;
  if (sideLength > 60) {
    return 60;
  } else {
    return sideLength;
  }
};

export const LetterBoxWrapper = styled.div<{
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
