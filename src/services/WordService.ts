import { GAME_STATUS, SESSION_KEYS } from "../config/CONSTANTS";
import EnvironmentService from "./EnvironmentService";
import SessionStorageService from "./SessionStorageService";

export class WordService {
  static BASE_URL = EnvironmentService.getApiBaseUrl();

  static isGameOver = false;

  static getSessionDetails() {
    const sessionId = this.getSessionId();
    if (sessionId === null) {
      return Promise.resolve(false);
    } else {
      return fetch(this.BASE_URL + "/session?id=" + sessionId)
        .then((response) => response.json());
    }
  }

  static getWordsMetadataFromSessionStorage() {
    const words = SessionStorageService.getFromSession(SESSION_KEYS.Words);
    const mapping = SessionStorageService.getFromSession(SESSION_KEYS.Mapping);
    const wordIndex = SessionStorageService.getFromSession(SESSION_KEYS.WordIndex);
    const startTime = SessionStorageService.getFromSession(SESSION_KEYS.StartTime);
    const gameStatus = SessionStorageService.getFromSession(SESSION_KEYS.GameStatus);
    const darkMode = SessionStorageService.getFromSession(SESSION_KEYS.DarkMode);
    const gameDuration = SessionStorageService.getFromSession(
      SESSION_KEYS.GameDuration
    );
    const bestTime = SessionStorageService.getFromSession(SESSION_KEYS.BestTime);
    const sessionId = SessionStorageService.getFromSession(SESSION_KEYS.SessionId);
    const wordLength = SessionStorageService.getFromSession(SESSION_KEYS.WordLength);
    const output = {
      words: [],
      mapping: [],
      index: 0,
      disabled: [],
      startTime: new Date().getTime(),
      darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      gameStatus: GAME_STATUS.New,
      gameDuration: 0,
      bestTime: "NA",
      sessionId: null,
      wordLength: 0,
    };
    if (sessionId !== null) {
      output.sessionId = sessionId;
    }
    if (wordLength !== null) {
      output.wordLength = +wordLength;
    }
    if (bestTime !== null) {
      output.bestTime = bestTime;
    }
    if (gameDuration !== null) {
      output.gameDuration = gameDuration;
    }
    if (gameStatus !== null) {
      output.gameStatus = gameStatus;
    }
    if (darkMode !== null) {
      output.darkMode = darkMode;
    }
    if (startTime !== null) {
      output.startTime = +startTime;
    }
    if (words !== null) {
      output.words = words;
    }
    if (wordIndex !== null) {
      output.index = +wordIndex;
    }
    if (mapping !== null) {
      output.mapping = mapping;
      output.mapping.forEach((val: string[], i: number) => {
        val.forEach((letterMap: string, j: number) => {
          if (letterMap === "absent") {
            output.disabled.push(output.words[i][j]);
          }
        });
      });
      output.disabled = Array.from(new Set(output.disabled));
    }
    return output;
  }

  static getSessionId() {
    return SessionStorageService.getFromSession(SESSION_KEYS.SessionId);
  }

  static startNewGame() {
    SessionStorageService.deleteKey(SESSION_KEYS.SessionId);
    SessionStorageService.deleteKey(SESSION_KEYS.WordLength);
    SessionStorageService.deleteKey(SESSION_KEYS.StartTime);
    SessionStorageService.deleteKey(SESSION_KEYS.GameDuration);
    SessionStorageService.deleteKey(SESSION_KEYS.Mapping);
    SessionStorageService.deleteKey(SESSION_KEYS.WordIndex);
    SessionStorageService.deleteKey(SESSION_KEYS.Words);
    SessionStorageService.deleteKey(SESSION_KEYS.GameStatus);
    SessionStorageService.deleteKey(SESSION_KEYS.BestTime);
    return fetch(this.BASE_URL + "/newGame", { method: "POST" })
      .then((response) => response.json())
      .catch((error) => alert(error));
  }

  static revealWord() {
    const existingSessionId = SessionStorageService.getFromSession(
      SESSION_KEYS.SessionId
    );
    if (existingSessionId === null) {
      return Promise.resolve("");
    } else {
      return fetch(
        this.BASE_URL + "/reveal?sessionId=" + existingSessionId
      ).then((response) => response.json());
    }
  }

  static getWordLength() {
    const wordLength = SessionStorageService.getFromSession(SESSION_KEYS.WordLength);
    if (wordLength !== null) {
      return +wordLength;
    } else {
      return 0;
    }
  }

  static submit(word: string) {
    return fetch(this.BASE_URL + "/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        word: word,
        sessionId: this.getSessionId(),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.success) {
          throw new Error(response.message);
        } else {
          return response;
        }
      });
  }
}
