import axios from 'axios'

const instance = axios.create({
    baseURL: `http://www.appdoc.by/~api/json/`
});

export default instance;