import styled from "styled-components";

export const WinnerDialogButtonsWrapper = styled.div<{ isDarkMode: boolean }>`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;
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
export const WinnerDialogueFooterWrapper = styled.div<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? "#131313" : "white")};
  color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
`;

export const WinnerDialogContentWrapper = styled.div<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? "#131313" : "white")};
  color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
  transition: all 0.4s;
  position: relative;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* margin-bottom: 10px; */

    .app-title {
      font-family: "Leckerli One", cursive;
      font-size: 26px;
    }

    .title,
    .app-title {
      font-size: 18px;
      font-weight: bolder;
      &.highlight {
        color: ${(props) => (props.isDarkMode ? "#fff" : "#50df50")};
        ${(props) =>
          props.isDarkMode &&
          "text-shadow: 0 0 2px #fff, 0 0 1px #fff, 0 0 3px #fff, 0 0 7px #50df50, 0 0 24px #50df50, 0 0 14px #50df50, 0 0 42px #50df50, 0 0 52px #50df50;"}
      }
    }
  }

  .win-panel {
    color: ${(props) => (props.isDarkMode ? "#cfcfcf" : "white")};
    background-color: ${(props) => (props.isDarkMode ? "#7A9D2F" : "#17B814")};
    margin-bottom: 10px;
    padding: 7px;
    font-size: 13px;
    font-weight: bolder;
    line-height: 18px;
    letter-spacing: 6px;
    overflow: none;
    text-align: center;
    text-transform: uppercase;
    &.best-time-alert {
    }
  }

  .content {
    display: flex;
    justify-content: center;
    .congrats-img {
      height: 60px;
      z-index: 10;
      position: absolute;
      transform: translateY(-24px);
    }
  }
`;

export const WinStatsWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  user-select: none;
  margin-bottom: 20px;
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  padding: 20px;
  border-color: ${(props) => (props.isDarkMode ? "#272727" : "#e4e4e4")};
  background-color: ${(props) => (props.isDarkMode ? "#0e0e0e" : "whitesmoke")};

  .heading {
    font-weight: bold;
    font-size: 11px;
    margin-bottom: 16px;
    text-align: center;
    color: #1976d2;
  }

  .divider {
    width: 1px;
    height: 20px;
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
      font-size: 16px;
      font-weight: bold;
      .stat-value-subtext {
        font-size: 11px;
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
