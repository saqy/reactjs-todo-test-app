import React, { Component } from "react";
import { axios } from "../common";
export default class TodoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    this.updateTodo = this.updateTodo.bind(this);
  }
  updateTodo() {
    const { todo, fetchTodosList } = this.props;

    axios
      .put(`/todos/${todo.id}`, {
        isDone: true,
      })
      .then((response) => {
        // handle success
        fetchTodosList();
        this.setState({ error: false });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }
  displayTodoDetails() {
    const { todo } = this.props;
    if (todo) {
      const { title, isDone, priority, tags } = todo;
      return (
        <div className="todo-details">
          <h3>{title}</h3>
          <p>Priority: {priority}</p>
          <p>Status: {isDone ? "completed" : "incomplete"}</p>
          <p>{tags && tags.map((item) => item)}</p>
          <input
            type="button"
            value="Update"
            onClick={this.updateTodo}
            className="btn btn-info"
          />
        </div>
      );
    }
    return null;
  }
  render() {
    const { error } = this.state;
    return (
      <>
        <div id="todo-details">{this.displayTodoDetails()}</div>
        {error && (
          <div class="alert alert-danger mt-3  " role="alert">
            Error: Todo Update Failed
          </div>
        )}
      </>
    );
  }
}
