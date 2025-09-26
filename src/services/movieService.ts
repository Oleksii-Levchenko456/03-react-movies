import axios from "axios";
import type { Movie } from "../types/movie";
const token = import.meta.env.VITE_TMDB_TOKEN;

interface ApiMovieResponse {
    page: number
    results: Movie[]
}


const API = axios.create({
    baseURL: 'https://api.themoviedb.org/3/search/movie',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default async function fetchMovie(query: string): Promise<ApiMovieResponse> {
    const response = await API.get<ApiMovieResponse>('', {
        params: { query }
    })
    return response.data
}