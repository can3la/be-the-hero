import axios from 'axios';

import env from '../env';

const api = axios.create({
    baseURL: env.API_BASE_URL
});

export default api;