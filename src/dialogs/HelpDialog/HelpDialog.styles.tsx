import styled from "styled-components";

export const HelpDialogContentWrapper = styled.div<{ isDarkMode: boolean }>`
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
  .header {
    svg {
      fill: ${(props) => (props.isDarkMode ? "#d7dadc" : "gray")};
    }
  }
`;
