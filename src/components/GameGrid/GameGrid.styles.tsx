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
}>`
  border: 2px solid transparent;
  box-sizing: border-box;
  margin: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.5s ease-in;
  width: 50px;
  height: 50px;
  font-size: 24px;
  color: ${(props) => (props.isDarkMode ? "#f0f0f0" : "white")};

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
    color: ${(props) => (props.isDarkMode ? "#f0f0f0" : "black")};
  }

  &.correct {
    background-color: ${props => props.isDarkMode ? "#7A9D2F" : "#17B814"};
    border-color: ${props => props.isDarkMode ? "#7A9D2F" : "#17B814"};
  }

  &.present {
    background-color: ${props => props.isDarkMode ? "#B6A102" : "#F6CD13"};
    border-color: ${props => props.isDarkMode ? "#B6A102" : "#F6CD13"};
  }

  &.absent {
    background-color: ${props => props.isDarkMode ? "#B22B06" : "#DC3318"};
    border-color: ${props => props.isDarkMode ? "#B22B06" : "#DC3318"};
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
