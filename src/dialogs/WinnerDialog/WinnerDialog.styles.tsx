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
      color: #50df50;
      font-weight: bolder;
    }
  }

  .content {
    .stats {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      user-select: none;
      margin-bottom: 40px;

      .divider {
        width: 1px;
        background-color: ${(props) =>
          props.isDarkMode ? "#272727" : "#e4e4e4"};
      }

      .winner-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        flex-shrink: 0;

        label {
          font-size: 11px;
        }
        .stat-value {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .share-section {
      margin-top: 30px;
      .heading {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 5px;
        text-align: center;
      }
      .sharing-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
