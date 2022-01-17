export enum SESSION_KEYS {
    DarkMode = "dark_mode",
    HardMode = "hard_mode",
    StartTime = "start_time",
    EndTime = "end_time",
    WordLength = "word_length",
    SessionId = "session_id",
    Words = "words",
    Mapping = "mapping",
    WordIndex = "word_index",
}

class SessionService {
    static saveToSession(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    static getFromSession(key: string) {
        const value = sessionStorage.getItem(key);
        if (value !== null) {
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