import React, { Component } from "react";
import TodoDetails from "./TodoDetails.jsx";
import { axios } from "../common";
// components

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], selectedTodo: null, error: false, errorMsg: "" };
    this.fetchTodosList = this.fetchTodosList.bind(this);
    this.resetTodo = this.resetTodo.bind(this);
    this.displayTodos = this.displayTodos.bind(this);
  }
  componentDidMount() {
    this.fetchTodosList();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchTodosList();
    }
  }
  fetchTodosList() {
    axios
      .get("/todos")
      .then((response) => {
        this.setState({ todos: response.data });
        this.setState({ error: false, errorMsg: "" });
      })
      .catch((error) => {
        this.setState({ error: true, errorMsg: "Error: Todos cannot fetched" });
      });
  }
  resetTodo() {
    axios
      .post("/reset")
      .then(() => {
        this.setState({ selectedTodo: null, error: false, errorMsg: "" });
        this.fetchTodosList();
      })
      .catch((error) => {
        this.setState({ error: true, errorMsg: "Error: Reset Todos Failed" });
      });
  }
  displayTodos(todos) {
    if (todos)
      return todos.map((todo) => {
        return (
          <li
            key={todo.id}
            onClick={() => this.setState({ selectedTodo: todo })}
            style={{
              color: todo.isDone ? "#17a2b8" : "#000",
              borderColor: todo.isDone ? "#17a2b8" : "rgba(0, 0, 0, 0.125)",
            }}
          >
            {todo.title}
          </li>
        );
      });
    return null;
  }
  render() {
    const { todos, selectedTodo, error, errorMsg } = this.state;
    return (
      <div className="todo-list-wrap">
        {todos && <h4>Your Todos</h4>}
        <ul id="todo-list">{this.displayTodos(todos)}</ul>
        <input
          type="button"
          value="Reset all todos"
          className="btn btn-info mt-2"
          onClick={this.resetTodo}
        />
        {selectedTodo && (
          <TodoDetails
            todo={selectedTodo}
            fetchTodosList={this.fetchTodosList}
          />
        )}
        {error && (
          <div class="alert alert-danger mt-3  " role="alert">
            {errorMsg}
          </div>
        )}
      </div>
    );
  }
}
export const ListsTodo = React.memo(Lists);
