import React from 'react';

const MovieCard = ({ movie, deleteMovie }) => {
  return (
    <article className="w-56 border border-white p-3 rounded-md">
      <h2 className="text-cyan-400 text-xl font-bold text-center mb-5">{movie.name}</h2>
      <ul className="mb-5">
        <li>
          <span className="text-cyan-400">Genre: </span>
          {movie.genre}
        </li>
        <li>
          <span className="text-cyan-400">Duration: </span>
          {movie.duration} min
        </li>
        <li>
          <span className="text-cyan-400">Release Date: </span>
          {movie.release_date}
        </li>
      </ul>
      <div className="flex flex-row justify-center gap-3 items-center">
        <button
          className="border border-transparent hover:border-red-500 hover:text-red-500 rounded p-1 bg-gray-900"
          onClick={() => deleteMovie(movie.id)}
        >
          🚨Borrar🚨
        </button>
        <button
          className="border border-transparent hover:border-amber-400 hover:text-amber-400 rounded p-1 bg-gray-900"
          // onClick={() => deleteMovie(movie.id)}
        >
          ✏Edit✏
        </button>
      </div>
    </article>
  );
};

export default MovieCard;
