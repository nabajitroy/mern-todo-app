import React from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { BoxLoading } from "react-loadingg";
import axios from "axios";
export default class TodoItem extends React.Component {
  /* handleDelete() {
    console.log("Hellooo");
  }
*/

  constructor(props) {
    super(props);
    // this.state = { todos: [] };
    // this.handleDelete = this.handleDelete.bind(this);
    // console.log("Todos -" + JSON.stringify(this.props));
  }

  // handleDelete = id => {
  // this.props.todos.shift();
  // axios
  //   .delete("http://localhost:5000/todos/" + id)
  //   .then(res => {
  //     this.setState({ todos: this.props });
  //     // this.setState(res => {
  //     //   return {
  //     //     items: [...res.items, res.data],
  //     //     isLoading: false
  //     //   };
  //     // });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // };
  render() {
    let todos = this.props.todo;
    console.log("Hello there " + this.props.itemToDelete);
    //  return "true";

    /*const tags = todos.todo_tag;
    var data = "";
    tags.map((val, i) => {
      data += "," + val;
    });
    data.substring(1);*/

    return (
      <tr>
        <td>{todos.todo_description}</td>
        <td>{todos.todo_tag}</td>
        <td>{todos.todo_docgroup} </td>
        <td>{todos.todo_doc_id}</td>
        <td>
          <Link to={"/edit/" + todos._id}>Edit</Link>&nbsp;&nbsp;
          <a
            href="#"
            className="item-remove"
            onClick={e => this.props.handleDelete(todos._id)}
          >
            Delete
          </a>
        </td>
      </tr>
    );
    //  });

    return <React.Fragment>{todos}</React.Fragment>;
  }
}
