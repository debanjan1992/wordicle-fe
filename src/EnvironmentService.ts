class EnvironmentService {
    static getApiBaseUrl() {
        return process.env.API_ENDPOINT;
    }
}

export default EnvironmentService;