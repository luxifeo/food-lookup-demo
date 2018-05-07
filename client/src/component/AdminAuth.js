import React, {Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
class AdminAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    }
  }
  validateForm() {
    return this.state.password.length > 0;
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
    return(
      <div className="Login">
      <h1>QUẢN LÝ ĐĂNG KÍ</h1>
      <form onSubmit={this.handleSubmit}>
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
          onClick={()=>this.props.auth(this.state.password)}
        >
          Đăng Nhập
        </Button>
      </form>
    </div>
    )
  }
}
export default AdminAuth;