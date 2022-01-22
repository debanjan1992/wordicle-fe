import GameGrid from "./GameGrid/GameGrid";
import Header from "./Header";
import Keyboard from "./Keyboard";
import { useEffect, useState } from "react";
import { WordService } from "./WordService";
import GameOverDialog from "./Dialogs/GameOverDialog";
import WinnerDialog from "./Dialogs/WinnerDialog";
import HelpDialog from "./Dialogs/HelpDialog";
import { GameWrapper, WordleWrapper } from "./Wordicle.styles";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from '@mui/material/CircularProgress';
import SettingsDialog from "./Dialogs/SettingsDialog";
import ConfigContext from "./ConfigContext";
import SessionService, { GAME_STATUS, SESSION_KEYS } from "./SessionService";

const getInitialWords = (chances: number) => {
    const wordsMetadata = WordService.getWordsMetadataFromSessionStorage();
    if (wordsMetadata.words && wordsMetadata.words.length > 0) {
        return wordsMetadata.words;
    } else {
        return Array.from({ length: chances }, () => "");
    }
};

const getInitialMapping = (chances: number) => {
    const wordsMetadata = WordService.getWordsMetadataFromSessionStorage();
    if (wordsMetadata.mapping && wordsMetadata.mapping.length > 0) {
        return wordsMetadata.mapping;
    } else {
        return Array.from({ length: chances }, () => [] as string[]);
    }
};

const Wordicle = () => {
    const wordsMetadata = WordService.getWordsMetadataFromSessionStorage();
    const [wordIdx, setWordIdx] = useState(wordsMetadata.index);
    const [chances, setChances] = useState(() => SessionService.getFromSession(SESSION_KEYS.HardMode) !== null ? SessionService.getFromSession(SESSION_KEYS.HardMode) === "true" ? 4 : 6 : 6);
    const [words, setWords] = useState(() => getInitialWords(chances));
    const [colorMap, setColorMap] = useState(() => getInitialMapping(chances));
    const [toastVisibility, setToastVisibility] = useState(false);
    const [gameOverDialogVisibility, setGameOverDialogVisibility] = useState(false);
    const [winnerDialogVisibility, setWinnerDialogVisibility] = useState(false);
    const [helpDialogVisibility, setHelpDialogVisibility] = useState(false);
    const [settingsDialogVisibility, setSettingsDialogVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(() => false);
    const [darkMode, setDarkMode] = useState(() => SessionService.getFromSession(SESSION_KEYS.DarkMode) !== null ? SessionService.getFromSession(SESSION_KEYS.DarkMode) : window.matchMedia("(prefers-color-scheme: dark)").matches);
    const wordLength = WordService.getWordLength();

    // const onKeyboardKeyPress = (event: KeyboardEvent) => {
    //     onKeyboardKeyClick(event.key.toUpperCase());
    // };

    const isWinner = () => {
        if (wordIdx - 1 >= 0) {
            const word = colorMap[wordIdx - 1];
            if (word.includes("present") || word.includes("absent") || word.length === 0) {
                return false;
            }
            return true;
        }
        return false;
    };

    const isLoser = () => {
        if (wordIdx < chances) {
            return false;
        } else {
            return true;
        }
    };

    const setColorCodes = (codes: string[]) => {
        const setCode = (colorCode: string, time: number) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    colorMap[wordIdx].push(colorCode);
                    setColorMap([...colorMap]);
                    resolve(true);
                }, time);
            });
        };
        const promises: Promise<unknown>[] = [];
        codes.forEach((code, index) => promises.push(setCode(code, 400 * (index + 1))));
        Promise.all(promises).then(() => {
            WordService.setWordsMetadataToSessionStorage(words, [...colorMap], wordIdx + 1);
            setWordIdx(wordIdx + 1);
        });
    };

    const submitWord = (wordInput: string) => {
        setIsLoading(true);
        WordService.submit(wordInput).then((response: { data: string[], word: string, message?: string }) => {
            setIsLoading(false);
            colorMap[wordIdx] = [];
            setColorCodes(response.data);
        }).catch((error) => {
            if (error.message === "Invalid Session") {
                onStartNewGame(true);
            } else {
                setIsLoading(false);
                words[wordIdx] = "";
                setWords([...words]);
                setToastVisibility(true);
            }
        });
    };

    const onKeyboardKeyClick = (key: string) => {
        if (key !== "ENTER" && key !== "BACKSPACE" && key.length === 1 && words[wordIdx].length < wordLength) {
            if (words[wordIdx]) {
                words[wordIdx] = words[wordIdx] + key;
            } else {
                words[wordIdx] = key;
            }
            setWords([...words]);
        } else if (key === "ENTER") {
            submitWord(words[wordIdx]);
        } else if (key === "BACKSPACE" && words[wordIdx].length - 1 >= 0) {
            words[wordIdx] = words[wordIdx].substring(0, words[wordIdx].length - 1);
            setWords([...words]);
        }
    };

    const onStartNewGame = (clearAll = true) => {
        setIsLoading(true);
        WordService.startNewGame(clearAll).then(() => {
            setIsLoading(false);
            setWords(getInitialWords(chances));
            setColorMap(getInitialMapping(chances));
            setWordIdx(0);
        });
        setGameOverDialogVisibility(false);
        setWinnerDialogVisibility(false);
    };

    useEffect(() => {
        if (wordIdx !== 0) {
            const gameStatus = SessionService.getFromSession(SESSION_KEYS.GameStatus);
            if (isWinner()) {
                if (gameStatus === GAME_STATUS.InProgress) {
                    SessionService.saveToSession(SESSION_KEYS.GameStatus, GAME_STATUS.GameOverWin);
                    SessionService.saveToSession(SESSION_KEYS.EndTime, new Date().getTime());
                }
                setTimeout(() => setWinnerDialogVisibility(true), 1000);
            } else if (isLoser()) {
                if (gameStatus === GAME_STATUS.InProgress) {
                    SessionService.saveToSession(SESSION_KEYS.GameStatus, GAME_STATUS.GameOverLost);
                    SessionService.saveToSession(SESSION_KEYS.EndTime, new Date().getTime());
                }
                setTimeout(() => {
                    setGameOverDialogVisibility(true);
                }, 1000);
            }
        }
    }, [wordIdx])

    useEffect(() => {
        const wasHelpPanelShown = SessionService.getFromSession(SESSION_KEYS.HelpPanelShown);
        if (wasHelpPanelShown === null || wasHelpPanelShown === "false") {
            SessionService.saveToSession(SESSION_KEYS.HelpPanelShown, true);
            setTimeout(() => setHelpDialogVisibility(true), 1000);
        }
        WordService.isSessionValid().then(valid => {
            setIsLoading(false);
            if (!valid) {
                onStartNewGame();
            }
        });
        // document.addEventListener("keydown", onKeyboardKeyPress);
        // return () => document.removeEventListener("keydown", onKeyboardKeyPress);
    }, []);

    return (
        <ConfigContext.Provider value={{ darkMode: darkMode, chances: chances }}>
            <Backdrop open={isLoading} sx={{
                backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.3)",
                color: darkMode ? "white" : "black",
            }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <GameWrapper isDarkMode={darkMode}>
                <Header onHelpIconClicked={() => {
                    SessionService.saveToSession(SESSION_KEYS.HelpPanelShown, true);
                    setHelpDialogVisibility(true);
                }}
                    onSettingsIconClicked={() => setSettingsDialogVisibility(true)} />
                <WordleWrapper>
                    <GameGrid wordLength={wordLength} words={words} map={colorMap} />
                    <Keyboard onKeyPressed={onKeyboardKeyClick} activeWord={words[wordIdx]} wordLength={wordLength} />
                </WordleWrapper>
            </GameWrapper>
            <GameOverDialog visible={gameOverDialogVisibility} onDismiss={(r) => {
                if (r && r === "backdropClick") {
                    return;
                }
                setGameOverDialogVisibility(false);
            }} onStartNewGame={() => {
                setWordIdx(0);
                onStartNewGame();
            }}></GameOverDialog>
            <WinnerDialog visible={winnerDialogVisibility} onDismiss={(r) => {
                if (r && r === "backdropClick") {
                    return;
                }
                setWinnerDialogVisibility(false);
                setWordIdx(0);
            }} onStartNewGame={onStartNewGame}></WinnerDialog>
            <HelpDialog visible={helpDialogVisibility} onDismiss={() => setHelpDialogVisibility(false)}></HelpDialog>
            <SettingsDialog visible={settingsDialogVisibility}
                onDismiss={() => setSettingsDialogVisibility(false)}
                onToggleDarkMode={darkMode => {
                    SessionService.saveToSession(SESSION_KEYS.DarkMode, darkMode);
                    setDarkMode(darkMode);
                }}
                onToggleHardMode={hardMode => {
                    SessionService.saveToSession(SESSION_KEYS.HardMode, hardMode);
                    if (hardMode) {
                        setChances(4);
                    } else {
                        setChances(6);
                    }
                    setWords(getInitialWords(chances));
                    setColorMap(getInitialMapping(chances));
                    setWordIdx(0);
                    onStartNewGame(true);
                }}
            ></SettingsDialog>
            <Snackbar
                open={toastVisibility}
                autoHideDuration={3000}
                message="Word not found in word list!"
                onClose={() => setToastVisibility(false)}
            />
        </ConfigContext.Provider>
    );
};

export default Wordicle;