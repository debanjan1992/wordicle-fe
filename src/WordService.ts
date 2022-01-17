import SessionService, { SESSION_KEYS } from "./SessionService";

export class WordService {
    // static BASE_URL = "http://localhost:4000/api";
    static BASE_URL = "http://192.168.1.107:4000/api";

    static isGameOver = false;

    static isSessionValid() {
        const sessionId = this.getSessionId();
        if (sessionId === null) {
            return Promise.resolve(false);
        } else {
            return fetch(this.BASE_URL + "/session/valid?id=" + sessionId)
                .then(response => response.json())
                .then(response => response.valid);
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

    static startNewGame(clearAll: boolean) {
        const existingSessionId = SessionService.getFromSession(SESSION_KEYS.SessionId);
        if (clearAll) {
            SessionService.deleteAll();
        }
        return fetch(this.BASE_URL + "/word?sessionId=" + existingSessionId)
            .then(response => response.json())
            .then(response => {
                SessionService.saveToSession(SESSION_KEYS.SessionId, response.id);;
                SessionService.saveToSession(SESSION_KEYS.WordLength, response.length);;
                SessionService.saveToSession(SESSION_KEYS.StartTime, new Date().getTime());
            });
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
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Not found");
            }
        });
    }

    static retry() {
        SessionService.saveToSession(SESSION_KEYS.Words, []);
        SessionService.saveToSession(SESSION_KEYS.Mapping, []);
        SessionService.saveToSession(SESSION_KEYS.WordIndex, 0);
    }
}