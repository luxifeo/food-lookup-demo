class Example extends React.Component {
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
              <FormGroup controlId="MaLop">
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
