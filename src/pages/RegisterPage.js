import React, { Component } from "react";
import {
  Button,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  CardBody,
  CardTitle,
  CardHeader,
  Card,
  Container,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: { username: "", email: "", password: "" },
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:8000/api/users/", this.state.credentials)
      .then((res) => {
        axios
          .post("http://localhost:8000/auth/", this.state.credentials)
          .then((response) => {
            // Lagrer token i session storage. Er lagret inntil nettleserfanen lukkes.
            sessionStorage.setItem("token", response.data.token);
            axios
              .get("http://localhost:8000/api/users/", {
                params: { token: response.data.token },
              })
              .then((response) => {
                this.props.handleUser(response.data);
                this.props.history.push("/");
              });
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  inputChanged = (event) => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  render() {
    return (
      <Container style={{ display: "flex" }}>
        <Row
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Col sm="7">
            <Card
              style={{
                marginTop: "50px",
                justifyContent: "center",
                boxShadow: "0 2px 2px 1px #ddd",
              }}
            >
              <CardHeader
                style={{
                  backgroundColor: "#e3735e",
                  boxShadow: "0 2px 2px 0 #ddd",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <CardTitle
                  tag="h1"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  <span style={{ fontFamily: "Satisfy", fontSize: "64px" }}>
                    Luka
                  </span>{" "}
                  - Ny bruker
                </CardTitle>
              </CardHeader>
              <CardBody style={{ padding: "24px 30px 10px 30px" }}>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Label for="usernameInp" sm="3">
                      Brukernavn:
                    </Label>
                    <Col sm="9">
                      <Input
                        id="usernameInp"
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.inputChanged}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="emailInp" sm="3">
                      E-post:
                    </Label>
                    <Col sm="9">
                      <Input
                        id="emailInp"
                        type="email"
                        name="email"
                        value={this.state.credentials.email}
                        onChange={this.inputChanged}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="passwordInp" sm="3">
                      Passord:
                    </Label>
                    <Col sm="9">
                      <Input
                        id="passwordInp"
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.inputChanged}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="d-flex justify-content-center">
                    <Button
                      color="primary"
                      type="submit"
                      style={{ marginRight: "10px" }}
                    >
                      Registrér
                    </Button>
                    <Link to="/login">
                      <Button
                        color="primary"
                        type="button"
                        style={{ marginLeft: "10px" }}
                      >
                        Tilbake
                      </Button>
                    </Link>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Register);
