import React, { Component } from "react";
import axios from "axios";
class Comments extends Component {
  constructor() {
    super();
    let name = localStorage.getItem("name");
    this.state = {
      title: "",
      body: "",
      post: [],
      name,
    };
  }

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ post: data });
        console.log("Data has been recieved");
      })
      .catch(() => {
        alert("Error retrieving Data!!!");
      });
  };

  handleChange = (event) => {
    const Target = event.target;
    const name = Target.name;
    const value = Target.value;

    this.setState({
      [name]: value,
    });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      Name: this.state.name,
      title: this.state.title,
      body: this.state.body,
      upvotes: 0,
      downvotes: 0,
    };
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    }).then(() => {
      this.resetState();
      this.getBlogPost();
    });
  };
  vote = (_id, num) => {
    var votes = this.state.post;
    var totalvote = votes.filter((vote) => vote._id === _id);
    if (num === 1) {
      const payload = {
        id: _id,
        upvote: totalvote[0].upvotes + num,
        downvote: totalvote[0].downvotes,
      };
      axios({
        url: "/api/vote",
        method: "POST",
        data: payload,
      }).then(() => {
        this.getBlogPost();
      });
    } else {
      const payload = {
        id: _id,
        upvote: totalvote[0].upvotes,
        downvote: totalvote[0].downvotes - num,
      };
      axios({
        url: "/api/vote",
        method: "POST",
        data: payload,
      }).then(() => {
        this.getBlogPost();
      });
    }
  };

  resetState = () => {
    this.setState({
      title: "",
      body: "",
    });
  };
  display = (posts) => {
    if (!posts.length) return null;

    return posts.map((e) => (
      <div key={e._id}>
        <div key={e._id}>
          <h3>{e.Name}</h3>
          <h3>{e.title}</h3>
          <p>{e.body}</p>
        </div>
        <div>
          <button onClick={() => this.vote(e._id, 1)}>Upvote</button>
          <button onClick={() => this.vote(e._id, -1)}>Downvote</button>
        </div>
        <div>Upvote:{e.upvotes}</div>
        <div>Downvote:{e.downvotes}</div>
      </div>
    ));
  };

  render() {
    console.log(this.state);
    return (
      <div className="outercontainer">
        <h2>Comments</h2>
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
        <div className="comment-section">{this.display(this.state.post)}</div>
      </div>
    );
  }
}

export default Comments;
