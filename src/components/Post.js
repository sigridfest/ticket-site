import axios from "axios";
import React, { Component } from "react";
import {
  Card,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Row,
  Col,
  CardSubtitle,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import "./Post.css";

export class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.postData.id,
      title: props.postData.title,
      post_type: props.postData.post_type,
      event_type: props.postData.event_type,
      location: props.postData.location,
      date: props.postData.date,
      time: props.postData.time,
      price: props.postData.price,
      description: props.postData.description,
      owner_name: props.postData.owner,
      ownerfk: props.postData.ownerfk,
      email: props.postData.email,
      completed: props.postData.completed,
      user: this.props.user,
      options: {
        showSoldButton: false,
        showFlag: false,
      },
    };
    this.handleCompleted = this.handleCompleted.bind(this);
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    if (this.props.postOptions) {
      this.setState({ options: this.props.postOptions });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postData.id !== this.props.postData.id) {
      this.setState({
        id: this.props.postData.id,
        title: this.props.postData.title,
        post_type: this.props.postData.post_type,
        event_type: this.props.postData.event_type,
        location: this.props.postData.location,
        date: this.props.postData.date,
        time: this.props.postData.time,
        price: this.props.postData.price,
        description: this.props.postData.description,
        ownerfk: this.props.postData.ownerfk,
        owner_name: this.props.postData.owner,
        email: this.props.postData.email,
        completed: this.props.postData.completed,
      });
    }
  }

  handleCompleted(evt) {
    axios
      .patch(`http://localhost:8000/api/update-post/${this.state.id}/`, {
        completed: !this.state.completed,
      })
      .then((response) => {
        this.setState({ completed: !this.state.completed });
        evt.target.checked = !evt.target.checked;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  click(e) {
    e.preventDefault();
    if (this.props.handleClick) {
      this.props.handleClick(this.props.postData);
    }
  }

  render() {
    return (
      <div className="container-fluid" style={{ width: "100%" }}>
        <Card
          id="card"
          onClick={this.click}
          style={{ width: "100%", boxShadow: "0 2px 2px 1px #ddd" }}
        >
          <CardHeader
            id="cardHeader"
            style={{ boxShadow: "0 2px 2px 1px #ddd", height: "70px" }}
          >
            <Row>
              <Col sm="9">
                <CardTitle id="postTitle">{this.state.title}</CardTitle>
              </Col>
              <Col sm="3">
                <CardSubtitle id="postSubtitle">
                  {this.state.post_type === "sell" ? "Selges" : "Ønskes kjøpt"}
                </CardSubtitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody id="postBody">
            <Row>
              <Col>
                <CardText>
                  <span className="font-weight-bold">Arrangement </span>
                  {this.state.event_type}
                </CardText>
              </Col>
              <Col>
                <CardText>
                  <span className="font-weight-bold">Sted </span>
                  {this.state.location}
                </CardText>
              </Col>
            </Row>
            <Row>
              <Col>
                <CardText>
                  <span className="font-weight-bold">Tidspunkt </span>
                  {this.state.date} {this.state.time}
                </CardText>
              </Col>
              <Col>
                <CardText>
                  <span className="font-weight-bold">Pris </span>
                  {this.state.price === 0
                    ? "Gis bort"
                    : this.state.price + ",-"}
                </CardText>
              </Col>
            </Row>
            {this.state.description !== "" && (
              <Row>
                <Col>
                  <CardText>
                    <span className="font-weight-bold">Beskrivelse </span>
                    {this.state.description}
                  </CardText>
                </Col>
              </Row>
            )}
          </CardBody>
          <CardFooter id="postFooter">
            <Row>
              <Col>
                <CardText>
                  <span className="font-weight-bold">
                    {this.state.post_type === "sell" ? "Selger" : "Kjøper"}
                  </span>
                </CardText>
              </Col>
              <Col>
                <CardText>
                  <span className="font-weight-bold">E-post </span>
                </CardText>
              </Col>
              {this.state.options.showFlagNums && (
                <Col xs={0.1}>
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                <CardText>
                  <NavLink
                    className="username"
                    to={`/profile-page/?user_id=${this.state.ownerfk}`}
                    activeStyle={{ opacity: 0.7 }}
                  >
                    {this.state.owner_name}
                  </NavLink>
                </CardText>
              </Col>
              <Col>
                <CardText>{this.state.email}</CardText>
              </Col>
              {this.state.options.showFlagNums && (
                <Col xs={0.1}>
                  <span>#&#128681;: {this.props.postData.flag_count}</span>
                </Col>
              )}
              {this.state.user.username !== this.state.owner_name &&
                this.state.options.showFlag && (
                  <Col xs={0.1}>
                    <NavLink
                      className="nav-link"
                      href="#nav-link"
                      to={"/create-flag/?post_id=" + this.props.postData.id}
                    >
                      Rapporter
                    </NavLink>
                  </Col>
                )}
            </Row>
            {this.state.user.username === this.state.owner_name &&
              this.state.options.showSoldButton && (
                <Row>
                  <Col sm="6"></Col>
                  <Col sm="6">
                    <FormGroup check inline>
                      <Input
                        value={this.state.completed}
                        defaultChecked={this.state.completed}
                        style={{ marginTop: "4px" }}
                        type="checkbox"
                        onClick={this.handleCompleted}
                      />{" "}
                      <Label check>
                        {this.state.post_type === "sell"
                          ? "Marker som solgt"
                          : "Marker som kjøpt"}
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              )}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default Post;
