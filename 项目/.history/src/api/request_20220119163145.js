//对axios进行二次分装
import axios from "axios";

const request = axios.create({
    timeout:5000
});

requests.interceptors.request.use((config) => {
    return config;
})

requests.interceptors.re