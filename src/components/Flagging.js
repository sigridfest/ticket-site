import React, { Component } from "react";
import {
  Card,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import "./Flagging.css";

export class Flagging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.flaggingData.id,
      category: props.flaggingData.category,
      description: props.flaggingData.description,
      post: props.flaggingData.post,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.flaggingData.id !== this.props.flaggingData.id) {
      this.setState({
        id: this.props.flaggingData.id,
        category: this.props.flaggingData.category,
        description: this.props.flaggingData.description,
        post: this.props.flaggingData.post,
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Card id="card">
          <CardHeader id="cardHeader">
            <Row>
              <Col sm="9">
                <CardTitle id="flagCategory">{this.state.category}</CardTitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody id="postBody">
            <Row>
              <Col>
                <CardText>
                  <span className="font-weight-bold">Beskrivelse </span>
                  {this.state.description}
                </CardText>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Flagging;
