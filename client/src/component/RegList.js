import React, { Component } from 'react';
import { Table, Tab } from 'react-bootstrap';
class RegList extends Component {
  render() {
    return (
      <div>
        <p>Danh sách đăng kí</p>
        <Table>
          <tbody>
            {this.props.list.map(item =>
              <tr key={item.MaLop}>
                <td>{item.MaLop}</td>
                <td>{item.MaMonHoc}</td>
                <td>{item.TenMonHoc}</td>
                <td>{item.SoTinChi}</td>
                <td>
                  <button
                    onClick={() => this.props.xoaDKLop(item.MaLop)}
                    type="button"
                  >
                    Xoá
                  </button>
                </td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default RegList;