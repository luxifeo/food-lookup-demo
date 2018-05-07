import React,{Fragment} from 'react';
class Info extends React.Component {
  render() {
    return(
      <div className='col'>
        <div className='col-md-3'>
          {this.props.info.map(res => 
          <Fragment>
          <p>Họ Tên : {res.HoTen}</p>
          <p>MSSV : {res.MSSV}</p>
          <p>Chương Trình Đào Tạo : {res.ChuongTrinh}</p>
          <p>Số Tín Chỉ Tối Đa : {res.TinChiMax}</p>
          </Fragment>
        )}
        </div>
      </div>
    );
  }
};
export default Info; 