import GameGrid from "../../components/GameGrid/GameGrid";
import Header from "../../components/Header/Header";
import Keyboard from "../../components/Keyboard/Keyboard";
import React, { useEffect, useState } from "react";
import { WordService } from "../../services/WordService";
import GameOverDialog from "../../dialogs/GameOverDialog/GameOverDialog";
import WinnerDialog from "../../dialogs/WinnerDialog/WinnerDialog";
import HelpDialog from "../../dialogs/HelpDialog/HelpDialog";
import Snackbar from "@mui/material/Snackbar";
import SettingsDialog from "../../dialogs/SettingsDialog/SettingsDialog";
import ConfigContext from "../../config/ConfigContext";
import SessionStorageService from "../../services/SessionStorageService";
import NewGame from "../../components/NewGame/NewGame";
import useKey from "../../hooks/useKey";
import { GAME_STATUS, SESSION_KEYS } from "../../config/CONSTANTS";
import { GameWrapper, WordleWrapper } from "./Wordicle.styles";
import Confetti from "../../Confetti";

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
  const [invalidWordToastVisibility, setInvalidWordToastVisibility] =
    useState(false);
  const [duplicateWordToastVisibility, setDuplicateWordToastVisibility] =
    useState(false);
  const [sessionExpiredToastVisibility, setSessionExpiredToastVisibility] =
    useState(false);
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
      setTimeout(() => setShowNewGameScreen(false), 500);
      onStartNewGame();
    } else if (
      !isLoading &&
      !showNewGameScreen &&
      gameStatus === GAME_STATUS.InProgress
    ) {
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

  const isDuplicateWord = (word: string) => {
    let toMatchArray = [...words];
    toMatchArray.splice(wordIdx, 1);
    return toMatchArray.includes(word);
  };

  const submitWord = (wordInput: string) => {
    if (isDuplicateWord(wordInput)) {
      setDuplicateWordToastVisibility(true);
      return;
    }
    setIsLoading(true);
    WordService.submit(sessionId, wordInput)
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
            SessionStorageService.saveToSession(
              SESSION_KEYS.GameDuration,
              response.duration
            );
            setGameStatus(GAME_STATUS.GameOverWin);
            SessionStorageService.saveToSession(
              SESSION_KEYS.GameStatus,
              GAME_STATUS.GameOverWin
            );
          }
          colorMap[wordIdx] = [];
          return setColorCodes(response.data);
        }
      )
      .then(() => {
        setWords(words);
        setColorMap([...colorMap]);
        setWordIdx(wordIdx + 1);
        SessionStorageService.saveToSession(SESSION_KEYS.Words, words);
        SessionStorageService.saveToSession(SESSION_KEYS.Mapping, [
          ...colorMap,
        ]);
        SessionStorageService.saveToSession(
          SESSION_KEYS.WordIndex,
          wordIdx + 1
        );
      })
      .catch((error) => {
        const message = error.response.data.message;
        if (message === "invalid word") {
          words[wordIdx] = "";
          setWords([...words]);
          SessionStorageService.saveToSession(SESSION_KEYS.Words, words);
          setInvalidWordToastVisibility(true);
        } else if (message === "invalid session") {
          setSessionExpiredToastVisibility(true);
          setShowNewGameScreen(true);
        } else if (message === "session expired") {
          setSessionExpiredToastVisibility(true);
          setShowNewGameScreen(true);
        }
      })
      .finally(() => setIsLoading(false));
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
    } else if (
      key === "ENTER" &&
      words[wordIdx].length === wordLength &&
      !isLoading
    ) {
      submitWord(words[wordIdx]);
    } else if (key === "BACKSPACE" && words[wordIdx].length - 1 >= 0) {
      words[wordIdx] = words[wordIdx].substring(0, words[wordIdx].length - 1);
      setWords([...words]);
    }
  };

  const onStartNewGame = () => {
    setIsLoading(true);
    return WordService.startNewGame().then((response: any) => {
      SessionStorageService.saveToSession(SESSION_KEYS.SessionId, response.id);
      SessionStorageService.saveToSession(
        SESSION_KEYS.Words,
        getInitialWords(chances)
      );
      SessionStorageService.saveToSession(
        SESSION_KEYS.Mapping,
        getInitialMapping(chances)
      );
      SessionStorageService.saveToSession(SESSION_KEYS.WordIndex, 0);
      SessionStorageService.saveToSession(
        SESSION_KEYS.WordLength,
        response.length
      );
      SessionStorageService.saveToSession(
        SESSION_KEYS.StartTime,
        +response.startTime
      );
      SessionStorageService.saveToSession(
        SESSION_KEYS.GameStatus,
        GAME_STATUS.InProgress
      );
      SessionStorageService.saveToSession(
        SESSION_KEYS.BestTime,
        response.bestTime
      );
      setGameStatus(GAME_STATUS.InProgress);
      setWords(getInitialWords(chances));
      setColorMap(getInitialMapping(chances));
      setWordIdx(0);
      setStartTime(+response.startTime);
      setBestTime(response.bestTime);
      setSessionId(response.id);
      setWordLength(response.length);
      setIsLoading(false);
    });
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
          SessionStorageService.saveToSession(
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
    WordService.getSessionDetails(sessionId)
      .then((response: any) => {
        setBestTime(response.bestTime);
        setWordLength(response.length);
        setStartTime(response.startTime);
        SessionStorageService.saveToSession(
          SESSION_KEYS.BestTime,
          +response.bestTime
        );
        SessionStorageService.saveToSession(
          SESSION_KEYS.WordLength,
          response.length
        );
        SessionStorageService.saveToSession(
          SESSION_KEYS.StartTime,
          response.startTime
        );
      })
      .catch((error) => {
        setShowNewGameScreen(true);
        if (sessionId !== null) {
          setSessionExpiredToastVisibility(true);
        }
      })
      .finally(() => setIsLoading(false));
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
            isLoading={isLoading}
            onStartClick={() => {
              if (showNewGameScreen) {
                onStartNewGame().then(() =>
                  setTimeout(() => setShowNewGameScreen(false), 500)
                );
              }
            }}
            onSettingsClick={() => {
              setTimeout(() => setSettingsDialogVisibility(true), 500);
            }}
            onRulesClick={() => {
              setTimeout(() => setHelpDialogVisibility(true), 500);
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
        onDismiss={(r) => setGameOverDialogVisibility(false)}
        onMainMenuClick={() => {
          setGameOverDialogVisibility(false);
          setTimeout(() => setShowNewGameScreen(true), 500);
        }}
      ></GameOverDialog>
      <WinnerDialog
        visible={winnerDialogVisibility}
        onDismiss={(r) => setWinnerDialogVisibility(false)}
        goBackToMainMenu={() => {
          setWinnerDialogVisibility(false);
          setTimeout(() => setShowNewGameScreen(true), 500);
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
          SessionStorageService.saveToSession(SESSION_KEYS.DarkMode, darkMode);
          setDarkMode(darkMode);
        }}
      ></SettingsDialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={invalidWordToastVisibility}
        autoHideDuration={3000}
        message="Word not found in word list!"
        onClose={() => setInvalidWordToastVisibility(false)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={duplicateWordToastVisibility}
        autoHideDuration={3000}
        message="You have already tried out this word"
        onClose={() => setDuplicateWordToastVisibility(false)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={sessionExpiredToastVisibility}
        autoHideDuration={3000}
        message="Your session has expired. Start a new game."
        onClose={() => setSessionExpiredToastVisibility(false)}
      />
    </ConfigContext.Provider>
  );
};

export default Wordicle;
