import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Label,
  Input,
  Form,
  FormGroup,
  Col,
  Row,
  Container,
  Button,
  Alert,
  CardTitle,
  CardHeader,
  Card,
  CardBody,
} from "reactstrap";
import axios from "axios";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: { username: "", password: "" },
      invalidCredentials: false
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:8000/auth/", this.state.credentials)
      .then((response) => {
        // Lagrer token i session storage. Er lagret inntil nettleserfanen lukkes.
        sessionStorage.setItem("token", response.data.token);
        axios
        .get("http://localhost:8000/api/users/", {
          params: { token: response.data.token },
        }).then((response_ud) => {
        this.props.handleUser(response_ud.data);
        this.props.history.push("/");
      }).catch((error) => {
        if (error.response.status === 403) {
          alert(error.response.data)
          sessionStorage.setItem("token", null)
        }
      })
    })
    .catch((error) => {
      console.error(error)
      this.setState({invalidCredentials:true})
      });
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
                  - Logg inn
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
                  {this.state.invalidCredentials && (
                  <Alert style={{width:"70%", marginLeft:"28%", marginTop:"20px"}} color="danger">Invalid credentials</Alert>
                  )}
                  <FormGroup
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      style={{ marginRight: "10px" }}
                      type="submit"
                      color="primary"
                    >
                      Logg inn
                    </Button>

                    <Button
                      type="button"
                      style={{ marginLeft: "10px" }}
                      color="primary"
                      onClick={(e) => this.props.history.push("/register")}
                    >
                      Registrér
                    </Button>
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

export default withRouter(LoginPage);
