import styled from "styled-components";

export const SettingsDialogContentWrapper = styled.div<{ darkMode?: boolean }>`
  color: ${(props) => (props.darkMode ? "#d7dadc" : "black")};
  p {
    font-size: 14px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-weight: 800;
      font-size: 24px;
    }
  }
  svg {
    fill: ${(props) => (props.darkMode ? "#d7dadc" : "gray")};
  }

  @media only screen and (min-width: 800px) {
    width: 60vw;
    margin: 0 auto;
  }
`;
