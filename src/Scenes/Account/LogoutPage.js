import React, { Component } from "react";
import helpers from "../../Shared/helpers";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardHeader,
  MDBBtn,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBSelect,
  MDBIcon,
  MDBContainer,
  MDBInput
} from "mdbreact";
import { Link } from "react-router-dom";

export default class LogoutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  logout() {
    localStorage.removeItem("user");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render = () => {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard style={{ margin: "30px 30% 0 30%" }}>
              <MDBCardBody>
                <form onSubmit={this.logout}>
                  <div className="text-center mt-4">
                    <MDBBtn color="light-blue" className="mb-3" type="submit">
                      Logout
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };
}
