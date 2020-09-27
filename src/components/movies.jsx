import React, { Component } from "react";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";

import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/list_group";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: { _id: 0, name: "All Genres" },
  };

  componentDidMount() {
    const genres = [{ _id: 0, name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
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

  handleGenreSelection = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
    } = this.state;
    if (count === 0) return <p> No Movies in Database</p>;
    const filteredMovies =
      selectedGenre && selectedGenre._id !== 0
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filteredMovies, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            textProperty="name"
            valueProperty="_id"
            selectedGenre={this.state.selectedGenre}
            onSelection={this.handleGenreSelection}
          ></ListGroup>
        </div>
        <div className="col">
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
              {movies.map((movie) => (
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
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
