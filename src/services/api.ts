import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gestclin.herokuapp.com',
});

 
export default api;