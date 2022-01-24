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
import SettingsDialog from "./Dialogs/SettingsDialog";
import ConfigContext from "./ConfigContext";
import SessionService, { GAME_STATUS, SESSION_KEYS } from "./SessionService";
import NewGame from "./NewGame";
import useKey from "./useKey";

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
  const [startTime, setStartTime] = useState(() =>
    SessionService.getFromSession(SESSION_KEYS.StartTime)
  );
  const [wordIdx, setWordIdx] = useState(wordsMetadata.index);
  const [words, setWords] = useState(() => getInitialWords(5));
  const [colorMap, setColorMap] = useState(() => getInitialMapping(5));
  const [toastVisibility, setToastVisibility] = useState(false);
  const [gameOverDialogVisibility, setGameOverDialogVisibility] =
    useState(false);
  const [winnerDialogVisibility, setWinnerDialogVisibility] = useState(false);
  const [helpDialogVisibility, setHelpDialogVisibility] = useState(false);
  const [settingsDialogVisibility, setSettingsDialogVisibility] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewGameScreen, setShowNewGameScreen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    SessionService.getFromSession(SESSION_KEYS.DarkMode) !== null
      ? SessionService.getFromSession(SESSION_KEYS.DarkMode)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const wordLength = WordService.getWordLength();
  useKey((e) => {
    if (!isLoading && !showNewGameScreen) {
      onKeyboardKeyClick(e.key.toUpperCase());
    }
  });

  const isLoser = () => {
    if (wordIdx < 5) {
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
    codes.forEach((code, index) =>
      promises.push(setCode(code, 400 * (index + 1)))
    );
    return Promise.all(promises);
  };

  const submitWord = (wordInput: string) => {
    setIsLoading(true);
    WordService.submit(wordInput)
      .then(
        (response: {
          data: string[];
          duration: number;
          gameOver: boolean;
          word: string;
          message?: string;
        }) => {
          setIsLoading(false);
          colorMap[wordIdx] = [];
          setColorCodes(response.data).then(() => {
            WordService.setWordsMetadataToSessionStorage(
              words,
              [...colorMap],
              wordIdx + 1
            );
            setWordIdx(wordIdx + 1);
            if (response.gameOver) {
              SessionService.saveToSession(
                SESSION_KEYS.GameDuration,
                response.duration
              );
              SessionService.saveToSession(
                SESSION_KEYS.GameStatus,
                GAME_STATUS.GameOverWin
              );
            }
          });
        }
      )
      .catch((error) => {
        if (error.message === "Invalid Session") {
          setShowNewGameScreen(true);
        } else {
          setIsLoading(false);
          words[wordIdx] = "";
          setWords([...words]);
          setToastVisibility(true);
        }
      });
  };

  const onKeyboardKeyClick = (key: string) => {
    if (
      key !== "ENTER" &&
      key !== "BACKSPACE" &&
      key.length === 1 &&
      words[wordIdx].length < wordLength
    ) {
      if (words[wordIdx]) {
        words[wordIdx] = words[wordIdx] + key;
      } else {
        words[wordIdx] = key;
      }
      setWords([...words]);
    } else if (key === "ENTER" && words[wordIdx].length === wordLength) {
      submitWord(words[wordIdx]);
    } else if (key === "BACKSPACE" && words[wordIdx].length - 1 >= 0) {
      words[wordIdx] = words[wordIdx].substring(0, words[wordIdx].length - 1);
      setWords([...words]);
    }
  };

  const onStartNewGame = () => {
    setIsLoading(true);
    WordService.startNewGame().then((response: any) => {
      setIsLoading(false);
      setWords(getInitialWords(5));
      setColorMap(getInitialMapping(5));
      setWordIdx(0);
      setStartTime(+response.startTime);
    });
    setGameOverDialogVisibility(false);
    setWinnerDialogVisibility(false);
  };

  const keyboardEventListener = (e: KeyboardEvent) => {
    onKeyboardKeyClick(e.key.toUpperCase());
  };

  useEffect(() => {
    if (wordIdx !== 0) {
      const gameStatus = SessionService.getFromSession(SESSION_KEYS.GameStatus);
      if (
        SessionService.getFromSession(SESSION_KEYS.GameStatus) ===
        GAME_STATUS.GameOverWin
      ) {
        setTimeout(() => {
          setWinnerDialogVisibility(true);
        }, 1000);
      } else if (isLoser()) {
        if (gameStatus === GAME_STATUS.InProgress) {
          SessionService.saveToSession(
            SESSION_KEYS.GameStatus,
            GAME_STATUS.GameOverLost
          );
        }
        setTimeout(() => {
          setGameOverDialogVisibility(true);
        }, 1000);
      }
    }
  }, [wordIdx]);

  useEffect(() => {
    const wasHelpPanelShown = SessionService.getFromSession(
      SESSION_KEYS.HelpPanelShown
    );
    if (wasHelpPanelShown === null || wasHelpPanelShown === "false") {
      SessionService.saveToSession(SESSION_KEYS.HelpPanelShown, true);
      setHelpDialogVisibility(true);
    }
    setIsLoading(true);
    WordService.getSessionDetails().then((response) => {
      setIsLoading(false);
      if (!response.valid) {
        setShowNewGameScreen(true);
      }
    });
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        darkMode: darkMode,
        chances: 5,
        isLoading: isLoading,
        startTime: startTime,
      }}
    >
      <GameWrapper isDarkMode={darkMode} isNewGame={showNewGameScreen}>
        <Header
          isNewGameScreen={showNewGameScreen}
          onHelpIconClicked={() => {
            SessionService.saveToSession(SESSION_KEYS.HelpPanelShown, true);
            setHelpDialogVisibility(true);
          }}
          onSettingsIconClicked={() => setSettingsDialogVisibility(true)}
        />
        <WordleWrapper>
          <NewGame
            visible={showNewGameScreen}
            onStartClick={() => {
              setTimeout(() => setShowNewGameScreen(false), 400);
              onStartNewGame();
            }}
            onSettingsClick={() => {
              setTimeout(() => setSettingsDialogVisibility(true), 400);
            }}
            onRulesClick={() => {
              setTimeout(() => setHelpDialogVisibility(true), 400);
            }}
          ></NewGame>
          <GameGrid
            wordLength={wordLength}
            words={words}
            map={colorMap}
            visible={!showNewGameScreen}
          />
          <Keyboard
            visible={!showNewGameScreen}
            onKeyPressed={onKeyboardKeyClick}
            activeWord={words[wordIdx]}
            wordLength={wordLength}
          />
        </WordleWrapper>
      </GameWrapper>
      <GameOverDialog
        visible={gameOverDialogVisibility}
        onDismiss={(r) => {
          if (r && r === "backdropClick") {
            return;
          }
          setGameOverDialogVisibility(false);
        }}
        onMainMenuClick={() => {
          setShowNewGameScreen(true);
          setGameOverDialogVisibility(false);
        }}
      ></GameOverDialog>
      <WinnerDialog
        visible={winnerDialogVisibility}
        onDismiss={(r) => {
          if (r && r === "backdropClick") {
            return;
          }
          setWinnerDialogVisibility(false);
        }}
        goBackToMainMenu={() => {
          setWinnerDialogVisibility(false);
          setShowNewGameScreen(true);
        }}
      ></WinnerDialog>
      <HelpDialog
        visible={helpDialogVisibility}
        onDismiss={() => setHelpDialogVisibility(false)}
      ></HelpDialog>
      <SettingsDialog
        visible={settingsDialogVisibility}
        onDismiss={() => setSettingsDialogVisibility(false)}
        onToggleDarkMode={(darkMode) => {
          SessionService.saveToSession(SESSION_KEYS.DarkMode, darkMode);
          setDarkMode(darkMode);
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
