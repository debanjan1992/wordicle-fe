import styled from "styled-components";

export const NewGameWrapper = styled.div<{ visible: boolean; isDarkMode: boolean }>`
  display: flex;
  user-select: none;
  position: absolute;
  top: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  transition: all 0.8s;
  background: ${(props) => (props.isDarkMode ? "black" : "white")};
  width: 100%;
  transform: ${(props) =>
    props.visible ? "translateY(0%)" : "translateY(100%)"};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  
  z-index: 100;
  button {
    min-width: 200px;
    pointer-events: ${props => props.visible ? "all" : "none"};
    user-select: none;
  }
  .app-title {
    font-size: 50px;
    color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
    margin-bottom: 30px;
    font-weight: bolder;
    .tag {
      font-size: 10px;
      letter-spacing: 0;
    }
  }
`;