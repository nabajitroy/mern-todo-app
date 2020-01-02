import React, { Component } from "react";
import axios from "axios";
export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/todos/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsible: response.data.todo_responsible,
          todo_priority: response.data.todo_priority,
          todo_completed: response.data.todo_completed
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  onChangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value
    });
  }
  onChangeTodoResponsible(e) {
    this.setState({
      todo_responsible: e.target.value
    });
  }

  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.value
    });
  }
  onChangeTodoCompleted(e) {
    console.log(e.target.value);
    this.setState({
      todo_completed: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };
    console.log(this.state.todo_completed);
    axios
      .put("http://localhost:5000/todos/" + this.props.match.params.id, newTodo)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const priorities = ["Low", "Medium", "High"];
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Update Toddo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            {priorities.map((level, index) => (
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="priorityOptions"
                  id={"priority" + level}
                  key={index}
                  value={level}
                  checked={this.state.todo_priority === level}
                  onChange={this.onChangeTodoPriority}
                />
                <label className="form-check-label">{level}</label>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>Completed: </label>
            <input
              type="checkbox"
              name="completedCheckBox"
              value={this.state.todo_completed}
              checked={this.state.todo_completed}
              onChange={this.onChangeTodoCompleted}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Update Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
