import React, { Component,Fragment } from 'react';
import { Link, Route } from "react-router-dom";
import { Navbar, Button, Nav } from "react-bootstrap";
import RegisterManage from './RegisterManage';
import ClassManage from './ClassManage';
class AdminPage extends Component {
  render() {
    return (
      <Fragment>
      <Header logout={this.props.logout} />
      <Route exact path='/admin' component={RegisterManage} />
      <Route path='/admin/classmanage' component={ClassManage} />
      </Fragment>
    )
  }
}
class Header extends Component {
  render() {
    return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/admin">Quản lý đăng kí</Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/admin/classmanage">Quản lý lớp học</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <Button bsStyle='danger' onClick={this.props.logout}>Đăng xuất</Button>
        </Nav>
      </Navbar>
    );
  }
}
export default AdminPage;