import React, { Component } from 'react';
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
class Reg extends Component {
    constructor(props) {
      super(props);
      this.state = {
        MaLop:""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      this.setState({[event.target.id]:event.target.value})
    }
    handleSubmit(event) {
      event.preventDefault();
      this.props.register(this.state.MaLop);
    }
    render(){
    return (
      <div className="register">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="MaLop" >
            <ControlLabel>Nhập Mã Lớp</ControlLabel>{' '}
            <FormControl
              type="text"
              value={this.state.MaLop}
              onChange={this.handleChange}
            />{" "}
          </FormGroup>
          <Button type='submit'>Đăng Kí</Button>
        </Form>
      </div>)
  }
}
export default Reg;