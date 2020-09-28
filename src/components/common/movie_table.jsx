import React, { Component } from "react";
import Like from "./like";
import Table from "./Table";

class MovieTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rental Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        ></Like>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btm-sm btn-danger"
          onClick={() => this.props.onDelete(movie._id)}
        >
          DELETE
        </button>
      ),
    },
  ];

  render() {
    const { data, onSort, sortColumn } = this.props;
    return (
      <Table
        data={data}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      ></Table>
    );
  }
}

export default MovieTable;
