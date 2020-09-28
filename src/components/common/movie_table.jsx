import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./table_body";
import Like from "./like";

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
    const { data, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader columns={this.columns} onSort={onSort}></TableHeader>
        <TableBody data={data} columns={this.columns} />
      </table>
    );
  }
}

export default MovieTable;
