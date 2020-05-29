import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import Register from "../Register/Register";
class Login extends Component {
  constructor() {
    super();
    let loggedIn = false;

    const token = localStorage.getItem("token");
    if (token) loggedIn = true;

    this.state = {
      Email: "",
      Password: "",
      loggedIn,
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async formSubmit(ev) {
    ev.preventDefault();
    const { Email, Password } = this.state;
    try {
      const response = await Axios.post("/login", { Email, Password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.Name);
      this.setState({
        loggedIn: true,
      });
    } catch (error) {
      this.setState({
        error: "Invalid Email/Password",
      });
    }
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/comments" />;
    }
    console.log(this.state);
    return (
      <div>
        <div>
          <div>
            <h3>Login</h3>
          </div>

          <form onSubmit={this.formSubmit}>
            <p>{this.state.error}</p>
            <div>
              <input
                name="Email"
                type="text"
                placeholder="Email"
                value={this.state.Email}
                onChange={this.onChange}
                required
              ></input>
            </div>
            <div>
              <input
                name="Password"
                value={this.state.Password}
                onChange={this.onChange}
                placeholder="Password"
                type="password"
                required
              ></input>
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <Register></Register>
      </div>
    );
  }
}

export default Login;
