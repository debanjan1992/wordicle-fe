import styled from "styled-components";

export const GameOverDialogContentWrapper = styled.div<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? "#131313" : "white")};
  color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
  transition: all 0.4s;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    .title {
      font-size: 24px;
      color: crimson;
      font-weight: bolder;
    }
  }
`;
