import GameGrid from "./GameGrid/GameGrid";
import Header from "./Header";
import Keyboard from "./Keyboard";
import React, { useEffect, useState } from "react";
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

export const getInitialWords = (chances: number) => {
  const wordsMetadata = WordService.getWordsMetadataFromSessionStorage();
  if (wordsMetadata.words && wordsMetadata.words.length > 0) {
    return wordsMetadata.words;
  } else {
    return Array.from({ length: chances }, () => "");
  }
};

export const getInitialMapping = (chances: number) => {
  const wordsMetadata = WordService.getWordsMetadataFromSessionStorage();
  if (wordsMetadata.mapping && wordsMetadata.mapping.length > 0) {
    return wordsMetadata.mapping;
  } else {
    return Array.from({ length: chances }, () => [] as string[]);
  }
};

const Wordicle = () => {
  const chances = React.useContext(ConfigContext).chances;
  const wordsMetadata = WordService.getWordsMetadataFromSessionStorage();
  const [startTime, setStartTime] = useState(wordsMetadata.startTime);
  const [wordIdx, setWordIdx] = useState(wordsMetadata.index);
  const [words, setWords] = useState(wordsMetadata.words as string[]);
  const [colorMap, setColorMap] = useState(wordsMetadata.mapping as string[][]);
  const [darkMode, setDarkMode] = useState(wordsMetadata.darkMode);
  const [gameStatus, setGameStatus] = useState(wordsMetadata.gameStatus);
  const [gameDuration, setGameDuration] = useState(wordsMetadata.gameDuration);
  const [bestTime, setBestTime] = useState(wordsMetadata.bestTime);
  const [sessionId, setSessionId] = useState(wordsMetadata.sessionId);
  const [wordLength, setWordLength] = useState(wordsMetadata.wordLength);
  const [toastVisibility, setToastVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewGameScreen, setShowNewGameScreen] = useState(false);

  //dialog states
  const [gameOverDialogVisibility, setGameOverDialogVisibility] =
    useState(false);
  const [winnerDialogVisibility, setWinnerDialogVisibility] = useState(false);
  const [helpDialogVisibility, setHelpDialogVisibility] = useState(false);
  const [settingsDialogVisibility, setSettingsDialogVisibility] =
    useState(false);

  useKey((e) => {
    if (!isLoading && showNewGameScreen && e.key.toUpperCase() === "ENTER") {
      setTimeout(() => setShowNewGameScreen(false), 400);
      onStartNewGame();
    } else if (!isLoading && !showNewGameScreen && gameStatus === GAME_STATUS.InProgress) {
      onKeyboardKeyClick(e.key.toUpperCase());
    }
  });

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
          if (response.gameOver) {
            setGameDuration(+response.duration);
            SessionService.saveToSession(
              SESSION_KEYS.GameDuration,
              response.duration
            );
            setGameStatus(GAME_STATUS.GameOverWin);
            SessionService.saveToSession(
              SESSION_KEYS.GameStatus,
              GAME_STATUS.GameOverWin
            );
          }
          colorMap[wordIdx] = [];
          setColorCodes(response.data).then(() => {
            setIsLoading(false);
            setWords(words);
            setColorMap([...colorMap]);
            setWordIdx(wordIdx + 1);
            SessionService.saveToSession(SESSION_KEYS.Words, words);
            SessionService.saveToSession(SESSION_KEYS.Mapping, [...colorMap]);
            SessionService.saveToSession(SESSION_KEYS.WordIndex, wordIdx + 1);
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
    } else if (key === "ENTER" && words[wordIdx].length === wordLength && !isLoading) {
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
      setWords(getInitialWords(chances));
      setColorMap(getInitialMapping(chances));
      setWordIdx(0);
      setStartTime(+response.startTime);
      setBestTime(response.bestTime);
      setGameStatus(GAME_STATUS.InProgress);
      setSessionId(response.id);
      setWordLength(response.length);
      SessionService.saveToSession(SESSION_KEYS.SessionId, response.id);
      SessionService.saveToSession(
        SESSION_KEYS.Words,
        getInitialWords(chances)
      );
      SessionService.saveToSession(
        SESSION_KEYS.Mapping,
        getInitialMapping(chances)
      );
      SessionService.saveToSession(SESSION_KEYS.WordIndex, 0);
      SessionService.saveToSession(SESSION_KEYS.WordLength, response.length);
      SessionService.saveToSession(SESSION_KEYS.StartTime, +response.startTime);
      SessionService.saveToSession(
        SESSION_KEYS.GameStatus,
        GAME_STATUS.InProgress
      );
      SessionService.saveToSession(SESSION_KEYS.BestTime, response.bestTime);
    });
    setGameOverDialogVisibility(false);
    setWinnerDialogVisibility(false);
  };

  useEffect(() => {
    if (wordIdx !== 0) {
      if (gameStatus === GAME_STATUS.GameOverWin) {
        setTimeout(() => {
          setWinnerDialogVisibility(true);
        }, 1000);
      } else if (isLoser()) {
        if (gameStatus === GAME_STATUS.InProgress) {
          setGameStatus(GAME_STATUS.GameOverLost);
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
    const wasHelpPanelShown = localStorage.getItem(SESSION_KEYS.HelpPanelShown);
    if (wasHelpPanelShown === null || wasHelpPanelShown === "false") {
      localStorage.setItem(SESSION_KEYS.HelpPanelShown, "true");
      setHelpDialogVisibility(true);
    }
    setIsLoading(true);
    WordService.getSessionDetails().then((response: any) => {
      setIsLoading(false);
      if (!response.valid) {
        setShowNewGameScreen(true);
      } else {
        setBestTime(response.bestTime);
        SessionService.saveToSession(SESSION_KEYS.BestTime, +response.bestTime);
      }
    });
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        darkMode: darkMode,
        chances: chances,
        isLoading: isLoading,
        startTime: startTime,
        gameStatus: gameStatus,
        gameDuration: gameDuration,
        mapping: colorMap,
        words: words,
        wordIdx: wordIdx,
        bestTime: bestTime,
        sessionId: sessionId,
        wordLength: wordLength,
      }}
    >
      <GameWrapper isDarkMode={darkMode} isNewGame={showNewGameScreen}>
        <Header
          isNewGameScreen={showNewGameScreen}
          onHelpIconClicked={() => {
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
