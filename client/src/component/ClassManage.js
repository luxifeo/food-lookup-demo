import React, { Component, Fragment } from 'react';
import { Table, Button, FormControl, ControlLabel, FormGroup, Form, Modal } from 'react-bootstrap';
class ClassManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{ MaLop: "", MaMonHoc: "", GiangVien: "", ToiDa: "" }],
      currentClass: [],
    }
    this.getList = this.getList.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.show = this.show.bind(this);
  }
  componentDidMount() {
    this.getList();
  }
  update(MaLop, MaMonHoc, GiangVien, ToiDa) {
    fetch("/api/editclass", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MaLop, MaMonHoc, GiangVien, ToiDa })
    }).then(res => res.json())
      .then(result => {
        if (result == 'Success') {
          this.getList();
          this.setState({ currentClass: [] })
        }
        else (alert("Cập nhật thất bại"))
      })
  }
  delete(MaLop) {
    fetch("/api/delclass", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MaLop })
    }).then(res => res.json())
      .then(result => {
        if (result == 'Success') {
          this.getList();
          this.setState({ currentClass: [] })
        }
        else (alert("Xóa thất bại"))
      })
  }
  create(MaLop, MaMonHoc, GiangVien, ToiDa) {
    fetch("/api/createclass", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ MaLop, MaMonHoc, GiangVien, ToiDa })
    }).then(res => res.json())
      .then(result => {
        if (result == 'Success') {
          this.getList();
          this.setState({ currentClass: [] })
        }
        else alert("Tạo lớp mới thất bại")
      })
  }
  show(key) {
    this.setState({ currentClass: [this.state.list[key]] })
  }
  getList() {
    fetch('/api/classlist')
      .then(res => res.json())
      .then(result => this.setState({ list: result }));
  }
  render() {
    return (
      <div className='col'>
        <div className='col-md-6'>
          <Create create={this.create}/>
          <Table>
            <tbody>
              <tr>
                <th>Mã Lớp</th>
                <th>Mã Môn Học</th>
                <th>Giảng Viên</th>
                <th>Tối Đa</th>
              </tr>
              {this.state.list.map((item, index) =>
                <tr onClick={() => this.show(index)}>
                  <td>{item.MaLop}</td>
                  <td>{item.MaMonHoc}</td>
                  <td>{item.GiangVien}</td>
                  <td>{item.ToiDa}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className='col-md-6'>
          {this.state.currentClass.map(item =>
            <Fragment>
              <FormExample item={item} delete={this.delete} update={this.update} />
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}
class FormExample extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.disable = this.disable.bind(this);
    this.state = {
      value: '',
      disabled: true,
      MaLop: "", MaMonHoc: "", GiangVien: "", ToiDa: ""
    };
  }
  componentDidMount() {
    this.setState({
      MaLop: this.props.item.MaLop,
      MaMonHoc: this.props.item.MaMonHoc,
      GiangVien: this.props.item.GiangVien,
      ToiDa: this.props.item.ToiDa
    })
  }
  componentWillReceiveProps() {
    this.setState({
      MaLop: this.props.item.MaLop,
      MaMonHoc: this.props.item.MaMonHoc,
      GiangVien: this.props.item.GiangVien,
      ToiDa: this.props.item.ToiDa
    })
  }
  disable() {
    const x = this.state.disabled ? false : true;
    this.setState({ disabled: x })
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  render() {
    return (
      <Form>
        <FormGroup controlId="MaLop">
          <ControlLabel>Mã Lớp</ControlLabel>
          <FormControl
            type="text"
            value={this.state.MaLop}
            onChange={this.handleChange}
            disabled
          />
        </FormGroup>
        <FormGroup controlId="MaMonHoc">
          <ControlLabel>Mã Môn Học</ControlLabel>
          <FormControl
            type="text"
            value={this.state.MaMonHoc}
            onChange={this.handleChange}
            disabled={this.state.disabled}
          />
        </FormGroup>
        <FormGroup controlId="GiangVien">
          <ControlLabel>Giảng Viên</ControlLabel>
          <FormControl
            type="text"
            value={this.state.GiangVien}
            onChange={this.handleChange}
            disabled={this.state.disabled}
          />
        </FormGroup>
        <FormGroup controlId="MaLop">
          <ControlLabel>Tối Đa</ControlLabel>
          <FormControl
            type="text"
            value={this.state.ToiDa}
            onChange={this.handleChange}
            disabled={this.state.disabled}
          />
        </FormGroup>
        <Button onClick={this.disable}>Sửa</Button>
        <Button onClick={()=>this.props.delete(this.state.MaLop)}>Xóa</Button>
        <Button onClick={()=>this.props.update(this.state.MaLop, this.state.MaMonHoc, this.state.GiangVien, this.state.ToiDa)}>Lưu</Button>
      </Form>
    );
  }
}
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.lastFavor = this.lastFavor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      show: false,
      MaLop: "", MaMonHoc: "", GiangVien: "", ToiDa: ""
    };
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  lastFavor() {
    this.handleClose();
    this.props.create(this.state.MaLop, this.state.MaMonHoc, this.state.GiangVien, this.state.ToiDa);
    
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>

        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Tạo lớp học mới
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup controlId="MaLop">
                <ControlLabel>Mã Lớp</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.MaLop}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="MaMonHoc">
                <ControlLabel>Mã Môn Học</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.MaMonHoc}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="GiangVien">
                <ControlLabel>Giảng Viên</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.GiangVien}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="ToiDa">
                <ControlLabel>Tối Đa</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.ToiDa}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.lastFavor}>Tạo</Button>
            <Button onClick={this.handleClose}>Hủy</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ClassManage;