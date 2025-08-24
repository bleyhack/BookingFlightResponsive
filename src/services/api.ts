import axios from "axios";

const api = axios.create({
    baseURL: 'https://sky-scrapper.p.rapidapi.com',
    headers:{
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
        'x-rapidapi-key': import.meta.env.VITE_API_KEY as string
    }
});

export default api;