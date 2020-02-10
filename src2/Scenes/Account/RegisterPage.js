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

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: ""
        };
    }

    validateForm() {
        return this.emailIsValid() && this.passwordIsValid();
    }

    emailIsValid() {
        return this.state.email.length > 0 && this.state.email.indexOf("@") > -1 && this.state.email.indexOf(".") > -1;
    }

    passwordIsValid() {
        return this.state.password.length > 0 && this.state.password == this.state.password2;
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
            .fetch(helpers.apiURL + "/lego/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: this.state.email, password: this.state.password, name: this.state.name })
            })
            .then(res => {
                this.props.history.push("/Validation");
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
                                <form onSubmit={this.handleSubmit}>
                                    <p className="h4 text-center py-4">Sign up</p>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="Your name"
                                            icon="user"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={this.handleChange}
                                            id="name"
                                        />
                                        <MDBInput
                                            label="Your email"
                                            icon="envelope"
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={this.handleChange}
                                            id="email"
                                        />
                                        <MDBInput label="Your password" icon="lock" id="password" group type="password" validate onChange={this.handleChange} />
                                        <MDBInput
                                            label="Confirm your password"
                                            id="password2"
                                            icon="exclamation-triangle"
                                            group
                                            type="password"
                                            validate
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn color="cyan" type="submit" disabled={!this.validateForm()}>
                                            Register
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
