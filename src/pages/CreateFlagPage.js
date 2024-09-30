import React, { Component, Fragment } from "react";
import {
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import HeaderBar from "../components/HeaderBar";

class CreateFlagPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Spam",
      description: "",
      post: new URLSearchParams(window.location.search).get("post_id"),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/api/create-flag/", this.state)
      .then((response) => this.props.history.push("/"));
  };

  render() {
    return (
      <Fragment>
        <HeaderBar user={this.props.user} reloadApp={this.props.reloadApp} />

        <Row style={{ width: "100%", justifyContent: "center" }}>
          <Col sm="7">
            <Card
              style={{
                marginTop: "20px",
                justifyContent: "center",
                boxShadow: "0 2px 2px 1px #ddd",
              }}
            >
              <CardHeader
                style={{
                  backgroundColor: "#e3735e",
                  boxShadow: "0 2px 2px 0 #ddd",
                }}
              >
                <CardTitle tag="h1" id="title" style={{ color: "white" }}>
                  Rapportér
                </CardTitle>
              </CardHeader>
              <CardBody style={{ padding: "10px 20px 10px 20px" }}>
                <Form id="flagg_form" onSubmit={this.handleSubmit}>
                  <p
                    style={{ whiteSpace: "break-spaces", textAlign: "center" }}
                  >
                    {this.state.error_message}
                  </p>
                  <FormGroup row className="formGroup">
                    <Label for="categoryInp" sm="3">
                      Årsak
                    </Label>
                    <Col sm="9">
                      <Input
                        id="categoryInp"
                        onChange={(e) =>
                          this.setState({ category: e.target.value })
                        }
                        type="select"
                        value={this.state.category}
                      >
                        <option value={"Spam"}>Spam</option>
                        <option value={"Feilinformasjon"}>
                          Feilinformasjon
                        </option>
                        <option value={"Upassende"}>Upassende</option>
                        <option value={"Annet"}>Annet</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="formGroup">
                    <Label for="descriptionInp" sm="3">
                      Beskrivelse
                    </Label>
                    <Col sm="9">
                      <Input
                        id="descriptionInp"
                        onChange={(e) =>
                          this.setState({ description: e.target.value })
                        }
                        type="textarea"
                        placeholder="Beskrivelse"
                        value={this.state.description}
                        maxLength={300}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      color="primary"
                      type="submit"
                      style={{ marginRight: "4em" }}
                    >
                      Send inn
                    </Button>
                    <Link to="/">
                      <Button
                        color="secondary"
                        type="button"
                        style={{ marginLeft: "4em" }}
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
      </Fragment>
    );
  }
}

export default withRouter(CreateFlagPage);
