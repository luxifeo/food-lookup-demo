import React, {Fragment} from 'react';
import AdminAuth from './AdminAuth';
import AdminPage from './AdminPage'
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin:false
    }
    this.auth = this.auth.bind(this);
    this.logout = this.logout.bind(this);
  }
  auth(password) {
    // Send Login info to Server
    fetch("/api/adminauth",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password})
    }).then(res => res.json())
    .then(res => {
      this.setState({isAdmin:res.isAdmin})
      if(!this.state.isAdmin) {
        alert("Mật khẩu không đúng");
      }
    })
    .catch(e => {
      console.log(e);
      alert("Đăng nhập thất bại")
    })
  }
  logout() {
    this.setState({isAdmin:false});
  }
  renderMethod() {
    if(!this.state.isAdmin) {
      return (<AdminAuth auth={this.auth} />)
    } else {
      return (<AdminPage logout={this.logout} />)
    }
  }
  render() {
    return ( 
      this.renderMethod()
    )
  }
}

export default Admin;