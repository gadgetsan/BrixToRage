import React, { Component } from "react";
import helpers from "./Shared/helpers";
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

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    login(userInfo) {
        localStorage.setItem("user", JSON.stringify(userInfo));
    }

    logout() {
        localStorage.removeItem("user");
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        window
            .fetch(helpers.apiURL + "/lego/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: this.state.email, password: this.state.password })
            })
            .then(res => {
                res.text()
                    .then(text => {
                        if (res.status === 401) {
                            // auto logout if 401 response returned from api
                            this.logout();
                            window.location.reload(true);
                        } else {
                            //on ajoute le password pour l'avoir plus tard
                            var userData = JSON.parse(text);
                            userData.password = this.state.password;
                            this.login(userData);
                            this.props.history.push("/parts");
                            //this.props.location = "/hello";
                        }
                    })
                    .catch(err => {
                        console.error("ERROR WHEN READING STREAM: " + err.message);
                    });
            })
            .catch(function(err) {
                console.error("ERR: " + err.message);
            });
    };

    render = () => {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard style={{ margin: "30px 30% 0 30%" }}>
                            <MDBCardBody>
                                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                                    <h3 className="my-3 text-center text-white">
                                        <MDBIcon icon="lock" /> Login:
                                    </h3>
                                </MDBCardHeader>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="grey-text">
                                        <MDBInput label="Type your email" icon="envelope" type="email" id="email" onChange={this.handleChange} />
                                        <MDBInput label="Type your password" icon="lock" type="password" id="password" onChange={this.handleChange} />
                                    </div>

                                    <div className="text-center mt-4">
                                        <MDBBtn color="light-blue" className="mb-3" type="submit" disabled={!this.validateForm()}>
                                            Login
                                        </MDBBtn>
                                    </div>
                                </form>
                                <MDBModalFooter>
                                    <div className="font-weight-light">
                                        <p>
                                            Not a member? <Link to="/register">Sign Up</Link>
                                        </p>
                                        <p>
                                            <Link to="/forgotPassword">Forgot Password?</Link>
                                        </p>
                                    </div>
                                </MDBModalFooter>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    };
}
