import React, { Fragment } from 'react';
import Info from './Info';
import Header from './Header';
import Timetable from './Timetable';
import RegList from './RegList';
import Reg from './Reg';
import { Route } from 'react-router-dom';
import ClassList from './ClassList';
class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [{ MSSV: "", HoTen: "", ChuongTrinh: "", TinChiMax: "" }],
      timetable: [{ MaLop: "", MaMonHoc: "", Ngay: "", Tiet: "", Tuan: "", PhongHoc: "" }],
      list: [{ MaLop: "", MaMonHoc: "", TenMonHoc: "", SoTinChi: "" }]
    };
    this.xoaDKLop = this.xoaDKLop.bind(this);
    this.layThoiKhoaBieu = this.layThoiKhoaBieu.bind(this);
    this.dangKi = this.dangKi.bind(this);
  }
  componentWillMount() {
    fetch('/api/info', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MSSV: this.props.MSSV })
    }).then(res => res.json())
      .then(result => this.setState({ info: result }))
      .catch(e => e);
    this.layThoiKhoaBieu();
    this.layDSLop();
  }
  layThoiKhoaBieu() {
    fetch('/api/timetable', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MSSV: this.props.MSSV })
    }).then(res => res.json())
      .then(result => this.setState({ timetable: result }))
  }
  layDSLop() {
    fetch('/api/list', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MSSV: this.props.MSSV })
    }).then(res => res.json())
      .then(result => this.setState({ list: result }))

  }
  xoaDKLop(MaLop) {
    fetch('/api/unreg', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MaLop: MaLop, MSSV: this.props.MSSV })
    }).then(res => res.json())
      .then(result => {
        const isNotId = item => item.MaLop !== MaLop;
        const updatedList = this.state.list.filter(isNotId);
        console.log(updatedList);
        this.setState({ list: updatedList });
      })
      .catch(e => e);
    this.layThoiKhoaBieu();
  }
  dangKi(MaLop) {
    fetch('/api/class', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MaLop: MaLop })
    }).then(res => res.json())
      .then(result => {
        const TinChi = this.state.list.reduce((total, tc) => total + Number(tc.SoTinChi), 0);
        if (Number(result[0].SoTinChi) + TinChi > Number(this.state.info[0].TinChiMax)) {
          alert(`Bạn đã vượt quá số tín chỉ cho phép. Không thể đăng kí lớp học ${result[0].MaLop}`);
          return;
        }
        else if (this.state.list.filter(x => x.MaMonHoc == result[0].MaMonHoc).length) {
          alert(`Bạn đã đăng kí môn học này`);
          return;
        }
        else {
          fetch('/api/reg', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ MaLop: MaLop, MSSV: this.props.MSSV })
          })
            .then(res => res.json())
            .then(result => {
              this.layDSLop();
              this.layThoiKhoaBieu();
            })
        }
      })
  }
  render() {
    return (
      <Fragment>
        <Header logout={this.props.logout} />
        <Route exact path='/' render={()=><Info info={this.state.info} />} />
        <Route exact path='/' render={()=><RegComponent dangKi={this.dangKi} list={this.state.list} xoaDKLop={this.xoaDKLop} timetable={this.state.timetable}/>} />
        <Route exact path='/list' component={ClassList} /> 
      </Fragment>
    )
  }
}

function RegComponent(props) {
  return <div className='col'>
    <div className='col-md-9'>
      <Reg register={props.dangKi} />
      <RegList list={props.list} xoaDKLop={props.xoaDKLop} />
      <Timetable timetable={props.timetable} />
    </div>
  </div>
}

export default UserPage;