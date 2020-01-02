import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
//import TodoItem from "./todoItem";
import TodoItem from "./todoItem";

import { BoxLoading } from "react-loadingg";
export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], loader: true };
    this.state.loader = true;
    this.handleDelete = this.handleDelete.bind(this);
    //  this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    /* console.log("Handle delete called " + id);
    this.state.itemToDelete = id;
    let index = this.state.todos.findIndex(x => x._id === id);
    var array = [...this.state.todos];
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ todos: array });
    }*/

    axios
      .delete("http://localhost:5000/todos/" + id)
      .then(res => {
        let index = this.state.todos.findIndex(x => x._id === id);
        var array = [...this.state.todos];
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({ todos: array });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/todos")
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getList() {
    /*  if (this.state.loader === true) {
      return <BoxLoading />;
    } else {
      return (
        <TodoItem todo={this.state.todos} handleDelete={this.handleDelete} />
      );
    }*/

    return this.state.todos.map((currentTodo, index) => {
      let id = currentTodo._id;
      //  currentTodo.loader[id] = this.state.loader[id];
      return (
        <TodoItem
          todo={currentTodo}
          itemToDelete={this.state.itemToDelete}
          handleDelete={this.handleDelete}
          key={index}
        />
      );

      /*return (
        <TodoItem
          todo={currentTodo}
          handleDelete={this.handleDelete}
          key={index}
        />
      );*/
    });
  }

  render() {
    return (
      <div>
        <h3>Document List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <td>Description</td>
              <td>Tag's</td>
              <td>Document Group</td>
              <td>Attachment</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>{this.getList()}</tbody>
        </table>
      </div>
    );
  }
}
