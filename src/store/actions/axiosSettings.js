import axios from 'axios'

const instance = axios.create({
   // baseURL: `${window.location.origin}/~api/json/`
    baseURL: `https://appdoc.by/~api/json/`
});

export default instance;