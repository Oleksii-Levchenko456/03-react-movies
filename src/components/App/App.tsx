import SearchBar from "../SearchBar/SearchBar";
import fetchMovie from "../../services/movieService";
import { useState } from 'react';
import type { Movie } from "../../types/movie";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


export default function App() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoader, setIsLoader] = useState(false)
    const [isError, setIsErros] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [movieForModal, setMovieForModal] = useState<Movie | null>(null)


    const handleSearch = async (query: string) => {
        try {
            setMovies([])
            setIsLoader(true)
            const results = await fetchMovie(query)
            if (results.results.length === 0) {
                toast('No movies found for your request.')
                return
            }
            setMovies(results.results)

        }
        catch {
            setIsErros(true)
        }
        finally {
            setIsLoader(false)
        }
    }

    const handleModal = (movie: Movie) => {
        setIsOpenModal(true)
        setMovieForModal(movie)
    }
    const closeModal = () => {
        setIsOpenModal(false)
    }

    useEffect(() => {
        console.log(movies)
    }, [movies])

    return (
        <>
            <SearchBar onSubmit={handleSearch} />
            {isLoader === true && <Loader />}
            {isError === true && <ErrorMessage />}
            <Toaster />
            <MovieGrid onSelect={handleModal} movies={movies} />
            {isOpenModal && movieForModal && (
                <MovieModal movie={movieForModal} onClose={closeModal} />
            )}
        </>
    )

}