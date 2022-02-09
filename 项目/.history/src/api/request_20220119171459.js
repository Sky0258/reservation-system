//对axios进行二次分装
import axios from "axios";

import nprogress from "nprogress";
import nprogress from "nprogress";

const requests = axios.create({
    timeout:5000
});

requests.interceptors.request.use((config) => {
    nprogress.start();
    return config;
})

requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'));
});

export default axios;