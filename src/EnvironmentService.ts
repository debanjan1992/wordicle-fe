class EnvironmentService {
    static getApiBaseUrl() {
        console.log("Process", process.env);
        return process.env.API_ENDPOINT;
    }
}

export default EnvironmentService;