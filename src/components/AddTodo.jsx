import React, { Component } from "react";
import { ListsTodo as Lists } from "./Lists.jsx";
import { axios } from "../common";

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      key: new Date().getTime(),
      error: false,
    };
  }
  submitForm(e) {
    e.preventDefault();
    const { name, desc } = this.state;
    if (!name || !desc) {
      alert("please add data in fields");
      return;
    }
    axios
      .post("/todos", {
        isDone: false,
        title: name,
        description: desc,
        priority: 5,
        tags: ["test"],
      })
      .then((response) => {
        // handle success
        this.setState({
          key: new Date().getTime(),
          error: false,
        });
      })
      .catch((error) => {
        // handle error
        this.setState({ error: true });
      });
  }
  render() {
    const { key, error } = this.state;
    return (
      <>
        <form
          id="add-todo"
          className="todo-form"
          onSubmit={this.submitForm.bind(this)}
        >
          <div className="form-group">
            <label>Todo name:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Todo description:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => this.setState({ desc: e.target.value })}
            />
          </div>
          <button className="btn btn-info ml-auto">Create</button>
          {error && (
            <div class="alert alert-danger mt-3  " role="alert">
              Error: Todo Create Failed
            </div>
          )}
        </form>
        <Lists new={key} />
      </>
    );
  }
}
