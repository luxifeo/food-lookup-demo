import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Navbar, Button, Nav } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Route path='/list' component={Reg} />
          <Route exact path='/' component={List} />
        </Navbar.Header>
        <Nav pullRight>
          <Button bsStyle='danger' onClick={this.props.logout}>Đăng xuất</Button>
        </Nav>
      </Navbar>
    );
  }
}
const Reg = () => (
  <Navbar.Brand>
    <Link to="/">Quay lai trang đăng kí</Link>
  </Navbar.Brand>
)
const List = () => (
  <Navbar.Brand>
    <Link to="/list">Danh Sách Lớp Học</Link>
  </Navbar.Brand>
)
export default Header;