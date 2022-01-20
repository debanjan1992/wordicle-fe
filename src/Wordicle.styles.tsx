import styled from "styled-components";

export const WordleWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`;

export const KeyboardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    >.row {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
    }
`;

export const KeyWrapper = styled.div<{ disabled?: boolean; isDarkMode: boolean; }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: ${props => props.isDarkMode ? "transparent" : "#d3d6da"};
    font-size: 14px;
    font-weight: 600;
    margin: 0 4px;
    user-select: none;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    pointer-events: ${props => props.disabled ? "not-allowed" : "all"};
    opacity: ${props => props.disabled ? 0.4 : 1};
    user-select: none;
    color: ${props => props.isDarkMode ? "#d7dadc" : "black"};
    border: 2px solid transparent;
    border-color: ${props => props.isDarkMode ? "rgba(255,255,255,0.2)" : "transparent"};
    &:hover {
        background-color: ${props => !props.disabled ? props.isDarkMode ? "rgba(255,255,255,0.1)" : "#e9e9e9" : "transparent"};
    }
    &:active {
        background-color: ${props => !props.disabled ? props.isDarkMode ? "#408544fb" : "#92df7e" : "transparent"};
    }
    min-width: 25px;
    padding: 0 8px;
    min-height: 60px;
    transition: all 0.7s;

    &.correct {
        border-color: #538d4e;
        color: #538d4e;
    }

    &.present {
        border-color: #b59f3b;
        color: #b59f3b;
    }

    &.absent {
        border-color: #BD1616;
        color: #BD1616;
    }

    /* For Desktop View */
    @media screen and (min-width: 1024px) {
        min-width: 50px;
        padding: 0 20px;
        min-height: 60px;
    }
    
    /* For Tablet View */
    @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
        min-width: 60px;
        padding: 0 8px;
        min-height: 70px;
    }
    
    /* For Mobile Portrait View */
    @media screen and (max-device-width: 480px) and (orientation: portrait) {
        min-width: 20px;
        min-height: 70px;
    }
    
    /* For Mobile Landscape View */
    @media screen and (max-device-width: 1024px) and (orientation: landscape) {
        min-width: 50px;
        padding: 0 8px;
        min-height: 60px;
    }
`;

export const GameGridWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const WordWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
`;

export const HeaderWrapper = styled.header<{ isDarkMode: boolean; }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.isDarkMode ? "#565758" : "#b9b9b9"};
    position: relative;
    .app-title {
        font-size: 24px;
        font-weight: 900;
        letter-spacing: 4px;
        color: ${props => props.isDarkMode ? "#d7dadc" : "black"};
        .tag {
            font-size: 10px;
            letter-spacing: 0;
        }
        .tag.hard {
            color: crimson;
        }
    }

    svg {
        width: 16px;
        height: 16px;
        fill: ${props => props.isDarkMode ? "#565758" : "#787c7e"}
    }

    /* For Desktop View */
    @media screen and (min-width: 1024px) {
        margin: 0 auto;
        width: 50vw;
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
            font-size: 44px;
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

export const GameWrapper = styled.div<{ isDarkMode: boolean }>`
    background-color: ${props => props.isDarkMode ? "black" : "white"};;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const getGameBoxSideForMobilePortrait = (wordLength: number): number => {
    const sideLength = (window.screen.availWidth / wordLength) - 14;
    if (sideLength > 80) {
        return 80;
    } else {
        return sideLength;
    }
};

export const GameBoxWrapper = styled.div<{ isDarkMode: boolean; wordLength: number; }>`
    border: 2px solid transparent;
    box-sizing: border-box;
    margin: 2px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    transition: all 0.7s ease-in-out;
    color: ${props => props.isDarkMode ? "#d7dadc" : "#3a3a3c"};
    font-size: 24px;
    width: 50px;
    height: 50px;

    &.not-filled {
        border-color: ${props => props.isDarkMode ? "#3a3a3c" : "#d3d6da"};
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
        border-color: ${props => props.isDarkMode ? "#565758" : "#878a8c"};
        animation: fillIn 0.2s ease-in-out;
    }

    &.correct {
        background-color: #538d4e;
        border-color: #538d4e;
        color: ${props => props.isDarkMode ? "#d7dadc" : "white"};
    }

    &.present {
        background-color: #b59f3b;
        border-color: #b59f3b;
        color: ${props => props.isDarkMode ? "#d7dadc" : "white"};
    }

    &.absent {
        background-color: #BD1616;
        border-color: #BD1616;
        color: ${props => props.isDarkMode ? "#d7dadc" : "white"};
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
        width: ${props => getGameBoxSideForMobilePortrait(props.wordLength) + "px"};
        height: ${props => getGameBoxSideForMobilePortrait(props.wordLength) + "px"};
    }
    
    /* For Mobile Landscape View */
    @media screen and (max-device-width: 1024px) and (orientation: landscape) {
        width: 56px;
        height: 56px;
    }
`;