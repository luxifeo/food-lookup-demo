import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
class RegisterManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{MSSV:"",MaLop:""}],
    }
    this.getList = this.getList.bind(this);
    this.register = this.register.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
    this.getList();
  }
  getList() {
    fetch('/api/reglist')
    .then(res=>res.json())
    .then(result=>this.setState({list:result}));
  }
  register(MSSV,MaLop){
    fetch('/api/reg', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MaLop: MaLop, MSSV: MSSV })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if(result == 'Success'){
        this.getList();
        } else(alert("Đăng Kí Thất Bại"))
      })
  }
  delete(MSSV,MaLop) {
    fetch('/api/unreg', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MaLop: MaLop, MSSV: MSSV })
    })
      .then(res => res.json())
      .then(result => {
        if(result == 'Success'){
        this.getList();
        } else(alert("Xóa Đăng Kí Thất Bại"))
      })
  }
  
  render() { 
    return(
      <div className='col'>
      <div className='col-md-5'>
        <p>Đăng kí</p>
        <RegForm action={this.register} />
        <p>Hủy đăng kí</p>
        <RegForm action={this.delete} />
      </div>
      <div className='col-md-7'>
      <Table>
        <tbody>
        <tr>
          <th>MSSV</th>
          <th>Mã Lớp Học</th>
        </tr>
        {this.state.list.map(item =>
          <tr>
            <td>{item.MSSV}</td>
            <td>{item.MaLop}</td>
          </tr>
        )}
        </tbody>
      </Table>
      </div>
      </div>
    )
  }
}
class RegForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {MSSV: '',MaLop:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    this.props.action(this.state.MSSV,this.state.MaLop);
    event.preventDefault();
  }

  render() {
    return (
      <form  onSubmit={this.handleSubmit}>
        <label>
          MSSV
          <input id='MSSV' type="text" value={this.state.MSSV} onChange={this.handleChange} />
        </label>
        <label>
          Mã Lớp
          <input id='MaLop' type="text" value={this.state.MaLop} onChange={this.handleChange} />
        </label>       
        <input type="submit" value="Đăng Kí" />
      </form>
    );
  }
}
export default RegisterManage;