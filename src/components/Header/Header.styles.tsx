import styled from "styled-components";

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