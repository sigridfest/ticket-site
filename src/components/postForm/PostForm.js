import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import "./PostForm.css";
import axios from "axios";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      post_type: "sell",
      event_type: "Konsert",
      location: "Oslo",
      date: "",
      time: "",
      price: 0,
      description: "",
      ownerfk: null,
      error_message: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.user != null) {
      this.setState({ ownerfk: this.props.user.id});
    }
  }

  onChangePostType(post_type) {
    this.setState({ post_type: post_type });
  }

  checkFormInputs() {
    let errorString = "";

    if (this.state.title === "") {
      errorString += "Du må jo ha tittel.\n";
    }

    if (this.state.date === "") {
      errorString += "Oppgi dato for arrangementet.\n";
    }

    if (this.state.time === "") {
      errorString += "Oppgi starttidspunkt for arrangementet.\n";
    }

    return errorString;
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const errorString = this.checkFormInputs();

    if (errorString === "") {
      axios
        .post("http://localhost:8000/api/create-post/", this.state)
        .then((response) => this.props.history.push("/"));
    } else {
      this.setState({ error_message: errorString });
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <Row className="justify-content-center">
          <Col sm="5">
            <h1 id="title">Nytt Innlegg</h1>
            <hr />

            <Form id="post_form" onSubmit={this.handleSubmit}>
              <FormGroup row className="formGroup">
                <ButtonGroup className="formGroup">
                  <Button
                    color="primary"
                    onClick={() => this.onChangePostType("sell")}
                    active={this.state.post_type === "sell"}
                  >
                    Selge
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.onChangePostType("buy")}
                    active={this.state.post_type === "buy"}
                  >
                    Kjøpe
                  </Button>
                </ButtonGroup>
              </FormGroup>
              <p style={{ whiteSpace: "break-spaces", textAlign: "center" }}>
                {this.state.error_message}
              </p>
              <FormGroup row className="formGroup">
                <Label for="titleInp" sm="3">
                  Tittel
                </Label>
                <Col sm="9">
                  <Input
                    id="titleInp"
                    onChange={(e) => this.setState({ title: e.target.value })}
                    type="text"
                    placeholder="Tittel"
                    maxLength={25}
                    value={this.state.title}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="formGroup">
                <Label for="eventInp" sm="3">
                  Arrangement
                </Label>
                <Col sm="9">
                  <Input
                    id="eventInp"
                    onChange={(e) => {
                      this.setState({ event_type: e.target.value });
                    }}
                    type="select"
                    value={this.state.event_type}
                  >
                    <option value={"Konsert"}>Konsert</option>
                    <option value={"Sportsarrangement"}>
                      Sportarrangement
                    </option>
                    <option value={"Teater"}>Teater</option>
                    <option value={"Foredrag"}>Foredrag</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row className="formGroup">
                <Label for="locationInp" sm="3">
                  Sted
                </Label>
                <Col sm="9">
                  <Input
                    id="locationInp"
                    onChange={(e) =>
                      this.setState({ location: e.target.value })
                    }
                    type="select"
                    value={this.state.location}
                  >
                    <option value={"Oslo"}>Oslo</option>
                    <option value={"Trondheim"}>Trondheim</option>
                    <option value={"Bergen"}>Bergen</option>
                    <option value={"Ålesund"}>Ålesund</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row className="formGroup">
                <Label for="dateInp" sm="3">
                  Dato
                </Label>
                <Col sm="9">
                  <Input
                    id="dateInp"
                    type="date"
                    value={this.state.date}
                    onChange={(e) => {
                      this.setState({ date: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="formGroup">
                <Label for="timeInp" sm="3">
                  Tidspunkt
                </Label>
                <Col sm="9">
                  <Input
                    id="timeInp"
                    type="time"
                    value={this.state.time}
                    onChange={(e) => {
                      this.setState({ time: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="formGroup">
                <Label for="priceInp" sm="3">
                  Pris
                </Label>
                <Col sm="9">
                  <Input
                    id="priceInp"
                    onChange={(e) => {
                      this.setState({ price: e.target.value });
                    }}
                    type="number"
                    value={this.state.price}
                    min={0}
                  />
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
                    maxLength={150}
                  />
                </Col>
              </FormGroup>
              <Button
                color="primary"
                type="submit"
                style={{ marginBottom: "10px" }}
              >
                Legg til
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(PostForm);
