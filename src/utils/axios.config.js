import axios from "axios";

let URL;

switch (process.env.REACT_APP_ENVIROMENT) {
    case "DEVELOPMENT":
        URL = "http://localhost:5000/";
        break;
    case "PRODUCTION":
        URL = "https://productionApiURL.com/";
        break;
    default:
        URL = "http://localhost:5000/";

}
const axiosInstance = axios.create({
    baseURL: URL,
})

export default axiosInstance;