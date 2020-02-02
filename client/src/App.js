import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    title: "",
    body: ""
  };

  handleChange = event => {
    const Target = event.target;
    const name = Target.name;
    const value = Target.value;

    this.setState({
      [name]: value
    });
  };

  submit = event => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };
    axios({
      url: "/api/save",
      method: "POST",
      data: payload
    })
      .then(() => {
        console.log("Data has been send to server");
        this.resetState();
      })
      .catch(() => {
        console.log("Internal server problem");
      });
  };

  resetState = () => {
    this.setState({
      title: "",
      body: ""
    });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Welcome to my App</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="Body"
              value={this.state.body}
              name="body"
              cols="30"
              rows="10"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
