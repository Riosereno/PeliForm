import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';

const BASE_URL = 'https://movies-crud-2.academlo.tech/';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef(null);

  const getMovies = async () => {
    try {
      const res = await axios.get(BASE_URL + 'movies/');

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createMovie = async (dataMovie) => {
    try {
      const res = await axios.post(BASE_URL + 'movies/', dataMovie);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      await axios.delete(BASE_URL + `movies/${movieId}/`);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      const moviesFromBackend = await getMovies();

      setMovies(moviesFromBackend);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const form = e.target;

    const dataForm = {
      name: form.name.value,
      genre: form.genre.value,
      duration: form.duration.value,
      release_date: form.release_date.value,
    };

    e.preventDefault();
    form.reset();

    await createMovie(dataForm);
    await loadMovies();
    setIsLoading(false);
  };

  const handleDeleteMovie = async (movieId) => {
    await deleteMovie(movieId);
    await loadMovies();
  };

  const loadMovieToForm = (movieData) => {
    // Cambia el formulario a modo edición
    setIsEditing(true);

    const form = formRef.current;

    // TAREA MORAL: Implementar la carga de la información de una pelicula en el formulario
    form.name.value = movieData.name;
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="bg-neutral-800 h-screen flex flex-col justify-center items-center p-10 text-white">
      <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit} ref={formRef}>
        <h2>{isEditing ? 'Edit' : 'Create'} Movie</h2>
        <div>
          <label htmlFor="nameId">Name: </label>
          <input type="text" name="name" id="nameId" className="text-black" />
        </div>
        <div>
          <label htmlFor="genreId">Genre: </label>
          <input type="text" name="genre" id="genreId" className="text-black" />
        </div>
        <div>
          <label htmlFor="durationId">Duration (min): </label>
          <input
            type="number"
            min="10"
            name="duration"
            id="durationId"
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="releaseDateId">Release Date: </label>
          <input
            type="date"
            name="release_date"
            id="releaseDateId"
            className="text-black"
          />
        </div>

        <button type="submit" className="border border-transparent hover:border-cyan-400">
          Create Movie
        </button>
      </form>

      <section>
        <h2 className="text-2xl text-cyan-400 font-bold text-center mb-5">Movie List</h2>
        <div className="flex flex-row flex-wrap gap-5 justify-center">
          {isLoading ? (
            <p>Loading movies...</p>
          ) : (
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} deleteMovie={handleDeleteMovie} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
