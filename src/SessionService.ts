export enum SESSION_KEYS {
    DarkMode = "dark_mode",
    HardMode = "hard_mode",
    StartTime = "start_time",
    WordLength = "word_length",
    SessionId = "session_id",
    Words = "words",
    Mapping = "mapping",
    WordIndex = "word_index",
    HelpPanelShown = "help_panel_shown",
    GameStatus = "game_status",
    BestTime = "best_time",
    GameDuration = "game_duration"
}

export enum GAME_STATUS {
    GameOverWin = "Game Over: Win",
    GameOverLost = "Game Over: Lost",
    InProgress = "In Progress",
    New = "New"
}

class SessionService {
    static saveToSession(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    static getFromSession(key: string) {
        const value = sessionStorage.getItem(key);
        if (value !== null && value !== "undefined") {
            return JSON.parse(value);
        }
        return null;
    }

    static deleteKey(key: string) {
        sessionStorage.removeItem(key);
    }

    static deleteAll() {
        sessionStorage.clear();
    }
}

export default SessionService;