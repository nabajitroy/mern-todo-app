import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { BoxLoading } from "react-loadingg";
export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    //  this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodotag = this.onChangeTodotag.bind(this);
    this.onChangeTododocGroups = this.onChangeTododocGroups.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
      todo_tag: [
        { id: 1, value: "ERP-system", isChecked: false },
        { id: 2, value: "IT Manual", isChecked: false },
        { id: 3, value: "Lotus Notes", isChecked: false },
        { id: 4, value: "IT-Client", isChecked: false },
        { id: 5, value: "IT Organisation", isChecked: false },
        { id: 6, value: "MS Office", isChecked: false },
        { id: 7, value: "T-Emergency", isChecked: false }
      ],
      todo_docGroup: false,
      loader: false
    };
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

  onChangeTodotag(e) {
    let tags = this.state.todo_tag;
    console.log(tags);
    tags.forEach(tag => {
      if (tag.value === e.target.value) tag.isChecked = e.target.checked;
    });
    this.setState({ todo_tag: tags });
  }
  onChangeTododocGroups(e) {
    console.log(e.target.value);
    this.setState({
      todo_docGroup: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    //  console.log(this.state.loader);
    this.state.loader = true;
    // console.log(this.state.loader);
    var todo = [];
    this.state.todo_tag.map((tag, index) => {
      if (tag.isChecked === true) todo.push(tag.value);
    });

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_docgroup: this.state.todo_docGroup,
      todo_tag: todo
      // todo_priority: this.state.todo_priority
    };

    axios
      .post("http://localhost:5000/todos", newTodo)
      .then(res => {
        this.setState({
          loader: false
        });
        console.log(res.data.todo.todo_doc_id);
        this.state.loader = false;
        window.open(
          "https://app.box.com/file/" + res.data.todo.todo_doc_id,
          "_blank" // <- This is what makes it open in a new window.
        );
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    });
    //this.state.loader = false;
    //  this.props.history.push("https://app.box.com/file/584099432267");
    // console.log(JSON.stringify(this.state));
  }

  sendSubmitSomewhere() {
    window.open(
      "https://app.box.com/file/584099432267",
      "_blank" // <- This is what makes it open in a new window.
    );
  }
  render() {
    const priorities = ["Low", "Medium", "High"];
    const tags = [
      "ERP-system",
      "IT Manual",
      "Lotus Notes",
      "IT-Client",
      "IT Organisation",
      "MS Office",
      "T-Emergency"
    ];

    const docGroups = [
      "Bulletin board",
      "General document",
      "Product Documentation",
      "QM documents",
      "Contacts",
      "Human resources",
      "Project document",
      "Statistics"
    ];

    if (this.state.loader == true) {
      return <BoxLoading />;
    } else {
      return (
        <div style={{ marginTop: 10 }}>
          <h3>Create New Document</h3>
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

            <div className="form-group ">
              <label className="form-check-label">Tags:</label>
              <div className="row">
                {tags.map((tag, index) => (
                  <div className=" col-sm-2 col" key={index}>
                    <input
                      type="checkbox"
                      value={tag}
                      name="tagOptions"
                      onChange={this.onChangeTodotag}
                    />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group ">
              <label className="form-check-label">Document Group:</label>
              <div className="row">
                {docGroups.map((docGroup, index) => (
                  <div className=" col-sm-4 col" key={index}>
                    <input
                      type="radio"
                      value={docGroup}
                      name="docGroupOptions"
                      onChange={this.onChangeTododocGroups}
                    />
                    {docGroup}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Create Todo"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      );
    }
  } // end of loader if
}
