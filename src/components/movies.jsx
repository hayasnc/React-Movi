import React, { Component } from "react";
import { getMovies } from "../services/movieService";
import Like from "./like";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((item) => item._id !== movieId);
    this.setState({ movies });
  };

  handleLikeToggle = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p> No Movies in Database</p>;
    return (
      <React.Fragment>
        <p>{count} Movies in Database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rental Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLikeToggle(movie)}
                  ></Like>
                </td>
                <td>
                  <button
                    className="btn btm-sm btn-danger"
                    onClick={() => this.handleDelete(movie._id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
