import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  state = {
    title: "",
    body: "",
    post: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios
      .get("/api")
      .then(response => {
        const data = response.data;
        this.setState({ post: data });
        console.log("Data has been recieved");
      })
      .catch(() => {
        alert("Error retrieving Data!!!");
      });
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
        this.getBlogPost();
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
  display = posts => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
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
        <div>{this.display(this.state.post)}</div>
      </div>
    );
  }
}

export default App;
