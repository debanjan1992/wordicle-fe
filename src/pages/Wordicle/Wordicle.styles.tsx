import styled from "styled-components";

export const WordleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
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
  `;