import React, { Component, Fragment } from 'react';
import {Table} from 'react-bootstrap';
const start = ['6h45', '7h35', '8h30', '9h20', '10h15', '11h05', '12h00', '12h30', '13h20', '14h15', '15h05', '16h00', '16h50']
const finish = ['7h30', '8h20', '9h15', '10h05', '11h00', '11h50', '13h15', '14h05', '15h00', '15h50', '16h45', '17h35']
class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list1: [{ MaLop: "", MaMonHoc: "", TenMonHoc: "", SoTinChi: "", ToiDa: "", SoLuongDangKi: "" }],
      list2: [{ MaLop: "", Ngay: "", Tuan: "", Tiet: "", PhongHoc: "" }]
    }
  }
  componentDidMount() {
    fetch('/api/list1').then(res=>res.json()).then(list1=>this.setState({list1}));
    fetch('/api/list2').then(res=>res.json()).then(list2=>this.setState({list2}));
  }
  render() {
    return (
      <div>
        <Table>
          <tbody>
          <tr>
            <th>Mã Lớp</th>
            <th>Mã Môn Học</th>
            <th>Tên Môn Học</th>
            <th>Số Tín Chỉ</th>
            <th>Số lượng tối đa</th>
            <th>Số lượng đăng kí</th>
          </tr>
        {this.state.list1.map(item =>
          <Fragment>
            <tr>
            <td>{item.MaLop}</td>
            <td>{item.MaMonHoc}</td>
            <td>{item.TenMonHoc}</td>
            <td>{item.SoTinChi}</td>
            <td>{item.ToiDa}</td>
            <td>{item.SoLuongDangKi||0}</td>
            </tr>
            {this.state.list2.filter(x => x.MaLop == item.MaLop).map(item2 =>     
                <Fragment>
                <tr style={{backgroundColor:'#75efd5',fontSize:'12px'}}>
                <td style={{backgroundColor:"white"}}></td>          
                <td>{item2.Ngay}</td>
                <td>{format(item2.Tiet)}</td>
                <td>{item2.Tuan}</td>
                <td>{item2.PhongHoc}</td>
                </tr>
                </Fragment>                       
            )}
          </Fragment>)}
          </tbody>
        </Table>
      </div>
    )
  }
}
function format(time) { // chuyển tiết thành giờ cho đẹp
  if(!time) return;
  let parse = time.replace(/\s/g, '').split('-');
  return `${start[parse[0] - 1]}-${finish[parse[1] - 1]}`;
}
export default ClassList;