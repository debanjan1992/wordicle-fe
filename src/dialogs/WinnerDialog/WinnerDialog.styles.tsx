import styled from "styled-components";

export const WinnerDialogButtonsWrapper = styled.div<{ isDarkMode: boolean }>`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 20px;
  button {
    margin: 0 10px;
  }
  border-top: 1px solid transparent;
  border-color: ${(props) => (props.isDarkMode ? "#272727" : "#e4e4e4")};

  /* For Mobile Portrait View */
  @media screen and (max-device-width: 480px) and (orientation: portrait) {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    button {
      margin: 5px 0px;
    }
  }

  @media screen and (max-width: 560px) {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    button {
      margin: 5px 0px;
    }
  }
`;

export const WinnerDialogContentWrapper = styled.div<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? "#131313" : "white")};
  color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
  transition: all 0.4s;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    .title {
      font-size: 26px;
      font-weight: bolder;
      &.highlight {
        color: ${(props) => (props.isDarkMode ? "#fff" : "#50df50")};
        ${(props) =>
          props.isDarkMode &&
          "text-shadow: 0 0 2px #fff, 0 0 1px #fff, 0 0 3px #fff, 0 0 7px #50df50, 0 0 24px #50df50, 0 0 14px #50df50, 0 0 42px #50df50, 0 0 52px #50df50;"}
      }
    }
  }

  .best-time-alert {
    border: 1px solid transparent;
    border-color: ${(props) => (props.isDarkMode ? "#464646" : "#cfcfcf")};
    color: ${(props) => (props.isDarkMode ? "white" : "black")};
    margin-bottom: 20px;
    padding: 7px;
    font-size: 11px;
    line-height: 18px;
  }
`;

export const WinStatsWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  user-select: none;
  margin-bottom: 40px;

  .divider {
    width: 1px;
    background-color: ${(props) => (props.isDarkMode ? "#272727" : "#e4e4e4")};
  }

  .winner-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;

    label {
      font-size: 10px;
      margin-bottom: 3px;
    }
    .stat-value {
      font-size: 18px;
      font-weight: bold;
      .stat-value-subtext {
        font-size: 12px;
        margin-left: 1px;
      }
      &.highlight {
        color: ${(props) => (props.isDarkMode ? "#fff" : "#dacc09")};
        ${(props) =>
          props.isDarkMode &&
          "text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;"};
      }
    }
  }
`;
