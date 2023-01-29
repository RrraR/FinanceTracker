import axios from 'axios';

export default axios.create({
    baseURL: `https://localhost:7208/api`
});