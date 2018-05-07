import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MSSV: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.MSSV.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <h1>Trang đăng kí học tập</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="MSSV" bsSize="large">
            <ControlLabel>Mã Số Sinh Viên</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.MSSV}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick={()=>this.props.auth(this.state.MSSV,this.state.password)}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}