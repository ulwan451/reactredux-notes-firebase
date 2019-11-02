import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from "../../../config/redux/action";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChangeText = e => {
    console.log(e.target.id);
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props
      .loginAPI({ email, password })
      .catch(err => err);
    if (res) {
      console.log("login sukses", res);

      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: ""
      });
      history.push("/");
    } else {
      console.log("err");
    }

    // console.log("email", this.state.email);
    // console.log("email", this.state.password);
    // console.log("data before send: ", email, password);
  };

  render() {
    return (
      <div>
        <div className="auth-card">
          <p className="auth-title">Login Page</p>
          <input
            className="input"
            placeholder="Email"
            type="text"
            id="email"
            onChange={this.handleChangeText}
            value={this.state.email}
          />
          <input
            className="input"
            placeholder="password"
            type="password"
            id="password"
            onChange={this.handleChangeText}
            value={this.state.password}
          />
          <Button
            onClick={this.handleLoginSubmit}
            title="Login"
            loading={this.props.isLoading}
          />
        </div>
        {/* <button>Go to Dashboard</button> */}
      </div>
    );
  }
}

const reduxState = state => ({
  isLoading: state.isLoading
});

const reduxDispatch = dispatch => ({
  loginAPI: data => dispatch(loginUserAPI(data))
});
export default connect(
  reduxState,
  reduxDispatch
)(Login);
