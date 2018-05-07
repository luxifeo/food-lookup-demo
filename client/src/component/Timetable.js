import React, { Component, Fragment } from 'react';
import { Table } from 'react-bootstrap';
const start = ['6h45', '7h35', '8h30', '9h20', '10h15', '11h05', '12h00', '12h30', '13h20', '14h15', '15h05', '16h00', '16h50']
const finish = ['7h30', '8h20', '9h15', '10h05', '11h00', '11h50', '13h15', '14h05', '15h00', '15h50', '16h45', '17h35']
function format(time) { // chuyển tiết thành giờ cho đẹp
  if(!time) return;
  let parse = time.replace(/\s/g, '').split('-');
  return `${start[parse[0] - 1]}-${finish[parse[1] - 1]}`;
}
class Timetable extends Component {
  render() {
    return (
      <Fragment>
        <p>Thời khóa biểu</p>
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <th>Mã lớp</th>
              <th>Mã môn học</th>
              <th>Thứ</th>
              <th>Tiết</th>
              <th>Tuần</th>
              <th>Phòng học</th>
            </tr>
            {this.props.timetable.map(row =>
              <Tablerow row={row} />
            )}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}
const Tablerow = ({ row }) => (
  <tr key={row.MaLop}>
    <td>{row.MaLop}</td>
    <td>{row.MaMonHoc}</td>
    <td>{row.Ngay}</td>
    <td>{format(row.Tiet)}</td>
    <td>{row.Tuan}</td>
    <td>{row.PhongHoc}</td>
  </tr>
)

export default Timetable;