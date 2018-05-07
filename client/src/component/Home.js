import React from 'react';  
import Login from './Login';
import UserPage from './UserPage';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn:false,
      MSSV: null
    };
    this.auth = this.auth.bind(this);
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.setState({isLoggedIn:false,MSSV:null});
  }
  auth(MSSV, password) {
    // Send Login info to Server
    fetch("/api/login",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({MSSV,password})
    }).then(res => res.json())
    .then(res => {
      this.setState({isLoggedIn:res.isLoggedIn,MSSV:res.MSSV})
      if(!this.state.isLoggedIn) {
        alert("Tài khoản hoặc mật khẩu không đúng");
      }
    })
    .catch(e => {
      console.log(e);
      alert("Đăng nhập thất bại")
    })
  }
  renderMethod() {
    if(!this.state.isLoggedIn) {
      return (<Login auth={this.auth} />)
    } else {
      return (<UserPage MSSV={this.state.MSSV} logout={this.logout} />)
    }
  }
  render() {
    return (<div>{this.renderMethod()}</div>)
  }
}
export default Home;