import EnvironmentService from "./EnvironmentService";
import SessionService, { GAME_STATUS, SESSION_KEYS } from "./SessionService";

export class WordService {
    static BASE_URL = EnvironmentService.getApiBaseUrl();

    static isGameOver = false;

    static getSessionDetails() {
        const sessionId = this.getSessionId();
        if (sessionId === null) {
            return Promise.resolve(false);
        } else {
            return fetch(this.BASE_URL + "/session?id=" + sessionId)
                .then(response => response.json())
                .then(response => {
                    SessionService.saveToSession(SESSION_KEYS.WordLength, response.length);
                    SessionService.saveToSession(SESSION_KEYS.StartTime, response.startTime);
                    SessionService.saveToSession(SESSION_KEYS.BestTime, response.bestTime);
                    return response;
                });
        }
    }

    static setWordsMetadataToSessionStorage(words: string[], mapping: string[][], index: number) {
        SessionService.saveToSession(SESSION_KEYS.Words, words);
        SessionService.saveToSession(SESSION_KEYS.Mapping, mapping);
        SessionService.saveToSession(SESSION_KEYS.WordIndex, index);
    }

    static getWordsMetadataFromSessionStorage() {
        const w = SessionService.getFromSession(SESSION_KEYS.Words);
        const m = SessionService.getFromSession(SESSION_KEYS.Mapping);
        const i = SessionService.getFromSession(SESSION_KEYS.WordIndex);
        const output = {
            words: [],
            mapping: [],
            index: 0,
            disabled: []
        };
        if (w !== null) {
            output.words = w;
        }
        if (m !== null) {
            output.mapping = m;
            output.mapping.forEach((val: string[], i: number) => {
                val.forEach((letterMap: string, j: number) => {
                    if (letterMap === "absent") {
                        output.disabled.push(output.words[i][j]);
                    }
                });
            });
            output.disabled = Array.from(new Set(output.disabled));
        }
        if (i !== null) {
            output.index = +i;
        }
        return output;
    }

    static getSessionId() {
        return SessionService.getFromSession(SESSION_KEYS.SessionId);
    }

    static startNewGame() {
        SessionService.deleteKey(SESSION_KEYS.SessionId);
        SessionService.deleteKey(SESSION_KEYS.WordLength);
        SessionService.deleteKey(SESSION_KEYS.StartTime);
        SessionService.deleteKey(SESSION_KEYS.GameDuration);
        SessionService.deleteKey(SESSION_KEYS.Mapping);
        SessionService.deleteKey(SESSION_KEYS.WordIndex);
        SessionService.deleteKey(SESSION_KEYS.Words);
        SessionService.deleteKey(SESSION_KEYS.GameStatus);
        SessionService.deleteKey(SESSION_KEYS.BestTime);
        return fetch(this.BASE_URL + "/newGame")
            .then(response => response.json())
            .then(response => {
                SessionService.saveToSession(SESSION_KEYS.SessionId, response.id);
                SessionService.saveToSession(SESSION_KEYS.WordLength, response.length);
                SessionService.saveToSession(SESSION_KEYS.StartTime, new Date().getTime());
                SessionService.saveToSession(SESSION_KEYS.GameStatus, GAME_STATUS.InProgress);
                SessionService.saveToSession(SESSION_KEYS.BestTime, response.bestTime)
            }).catch(error => alert(error));
    }

    static revealWord() {
        const existingSessionId = SessionService.getFromSession(SESSION_KEYS.SessionId);
        if (existingSessionId === null) {
            return Promise.resolve("");
        } else {
            return fetch(this.BASE_URL + "/reveal?sessionId=" + existingSessionId)
                .then(response => response.json())
                .then(response => response.data);
        }
    }

    static getWordLength() {
        const wordLength = SessionService.getFromSession(SESSION_KEYS.WordLength);
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                word: word,
                sessionId: this.getSessionId()
            })
        })
            .then(response => response.json())
            .then(response => {
                if (!response.success) {
                    throw new Error(response.message);
                } else {
                    return response;
                }
            })
    }
}