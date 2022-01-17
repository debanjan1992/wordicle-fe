import styled from "styled-components";

export const WordleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

export const KeyboardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 5px;
    >.row {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
    }
`;

export const KeyWrapper = styled.div<{ disabled?: boolean; isDarkMode: boolean }>`
    min-width: 40px;
    padding: 0 7px;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: ${props => props.isDarkMode ? "transparent" : "#d3d6da" };
    font-size: 14px;
    font-weight: 600;
    margin: 0 4px;
    user-select: none;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    pointer-events: ${props => props.disabled ? "not-allowed" : "all"};
    opacity: ${props => props.disabled ? 0.4 : 1};
    user-select: none;
    color: ${props => props.isDarkMode ? "#d7dadc" : "black"};
    border: 1px solid transparent;
    border-color: ${props => props.isDarkMode ? "rgba(255,255,255,0.2)" : "transparent" };
    &:hover {
        background-color: ${props => !props.disabled ? props.isDarkMode ? "rgba(255,255,255,0.1)" : "#e9e9e9" : "transparent" };
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
`;

export const HeaderWrapper = styled.header<{ isDarkMode: boolean; }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.isDarkMode ? "#565758" : "#b9b9b9"};
    width: 40vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    .app-title {
        font-size: 24px;
        font-weight: 900;
        letter-spacing: 4px;
        color: ${props => props.isDarkMode ? "#d7dadc" : "black"};
        .tag {
            font-size: 10px;
            color: crimson;
            letter-spacing: 0;
        }
    }

    svg {
        width: 16px;
        height: 16px;
        fill: ${props => props.isDarkMode ? "#565758" : "#787c7e"}
    }

    @media only screen and (min-width: 600px) {
        .app-title {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: 4px;
        }
        svg {
            width: 18px;
            height: 18px;
        }
    }

    @media only screen and (min-width: 1000px) {
        .app-title {
            font-size: 30px;
            font-weight: 900;
            letter-spacing: 6px;
        }
        svg {
            width: 22px;
            height: 22px;
        }
    }

    @media only screen and (min-width: 1281px) {
        .app-title {
            font-size: 34px;
            font-weight: 900;
            letter-spacing: 8px;
        }
        svg {
            width: 24px;
            height: 24px;
        }
    }
`;

export const GameWrapper = styled.div<{ isDarkMode: boolean }>`
    background-color: ${props => props.isDarkMode ? "black" : "white" };;
    height: 100%;
`;

export const GameBoxWrapper = styled.div<{ isDarkMode: boolean }>`
    border: 2px solid transparent;
    box-sizing: border-box;
    margin: 2px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    transition: all 0.7s ease-in-out;
    min-width: 36px;
    min-height: 36px;
    font-size: 18px;
    color: ${props => props.isDarkMode ? "#d7dadc" : "black"};

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
        color: #d7dadc;
    }

    &.present {
        background-color: #b59f3b;
        border-color: #b59f3b;
        color: #d7dadc;
    }

    &.absent {
        background-color: #3a3a3c;
        color: #d7dadc;
    }

    @media only screen and (min-width: 600px) {
        width: 48px;
        height: 48px;
        font-size: 22px;
    }

    @media only screen and (min-width: 1000px) {
        width: 48px;
        height: 48px;
        font-size: 24px;
    }

    @media only screen and (min-width: 1281px) {
        width: 56px;
        height: 56px;
        font-size: 28px;
    }
`;