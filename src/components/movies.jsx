import React, { Component } from "react";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/list_group";
import MovieTable from "./common/movie_table";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: { _id: 0, name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
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

  handleSort = (path) => {
    console.log(path);
    const sortColumn = { ...this.state.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.order = "asc";
      sortColumn.path = path;
    }
    this.setState({ sortColumn });
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
      sortColumn,
    } = this.state;
    if (count === 0) return <p> No Movies in Database</p>;
    const filteredMovies =
      selectedGenre && selectedGenre._id !== 0
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const sortedMovies = _.orderBy(
      filteredMovies,
      sortColumn.path,
      sortColumn.order
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);
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
          <MovieTable
            data={movies}
            onLike={this.handleLikeToggle}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          ></MovieTable>
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
