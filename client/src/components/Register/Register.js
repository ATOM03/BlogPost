import React, { Component } from "react";
import axios from "axios";
class Register extends Component {
  state = {
    Name: "",
    Email: "",
    Password: "",
    error: "",
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
      Name: this.state.Name,
      Email: this.state.Email,
      Password: this.state.Password,
    };
    axios({
      url: "/register",
      method: "POST",
      data: payload,
    })
      .then(() => {
        this.resetState();
      })
      .catch(() => {
        this.setState({
          error: "Email Already Registered",
        });
      });
  };

  resetState = () => {
    this.setState({
      Name: "",
      Email: "",
      Password: "",
    });
  };

  render() {
    return (
      <div>
        <div>
          <h3>Create Account</h3>
        </div>
        <div>
          <form onSubmit={this.submit}>
            <p>{this.state.error}</p>
            <div>
              <input
                name="Name"
                placeholder="Name"
                type="text"
                value={this.state.Name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="signup-input">
              <input
                name="Email"
                placeholder="Email"
                type="email"
                value={this.state.Email}
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="signup-input">
              <input
                name="Password"
                placeholder="Password"
                type="password"
                value={this.state.Password}
                required
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Register;
