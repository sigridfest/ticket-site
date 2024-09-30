import React, { Component } from "react";
import Flagging from "./Flagging.js";
import { Col, Button, Form, Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import getUser from "./getUser.js";
import "./FlagFeed.css";
import axios from "axios";
import Post from "./Post.js";

/**
 * En feed som genererer en liste med <Flagging> komponenter for å vise innlegg
 * Tar inn filtere, sorteringsattributt og search som props
 */
export class FlagFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flaggings: [],
      post: this.props.post,
      user: this.props.user,
    };
    this.flaggings = [];
    this.flaggingList = [];
  }
  /**
   * Kjører en get request når komponenten blir mountet.
   */
  componentDidMount() {
    this.setState({ filters: this.props.filters });
    getUser().then((user) => this.setState({ user: user }));
    this.getFlaggings();
  }
  /**
   * Sjekker om props har endret seg, og kjører en get request for å oppdatere feeden dersom de har det.
   * @param {props} prevProps det forrige settet med props som komponenten hadde
   */
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.post) !== JSON.stringify(this.props.post)) {
      this.getFlaggings();
    }
  }
  /**
   * Sender en GET request til serveren med alle filterene og sorteringsattributtene som er spesifisert.
   * this.props.search gjøres om til et filter.
   * Verdiene blir puttet inn i this.state.posts.
   */
  getFlaggings() {
    axios
      .get("http://localhost:8000/api/list-flags/", {
        headers: {
          "Content-Type": "application/json",
        },
        params: { post: this.props.post.id },
      })
      .then((response) => {
        this.setState({ flaggings: response.data });
      });
  }
  getFilters() {
    this.getterFilters = [
      {
        filteron: "post",
        filterop: "==",
        filtervalue: this.state.post,
      },
    ];
    this.getterFilters.push({
      filteron: "post",
      filterop: "==",
      filtervalue: parseInt(this.state.post),
    });
    return this.getterFilters;
  }

  handleSubmitPost = async (e) => {
    this.props.handleClick(null);
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/api/update-post/${this.props.post.id}/`, {
        hidden: "1",
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmitUserHide = async (e) => {
    this.props.handleClick(null);
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/api/users/${this.props.post.ownerfk}/`, {
        is_disabled: "1",
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmitUserDelete = async (e) => {
    this.props.handleClick(null);
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/api/users/${this.props.post.ownerfk}/`, {})
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Tegner en <Feed> komponent
   * @returns en <Feed> komponent
   */
  render() {
    return (
      <div className="container-fluid" id="mainDiv">
        {this.state.user && this.props.post && (
          <div id="flagContainer">
            <Col sm="10" id="flagCol">
              <Post postData={this.props.post} user={this.state.user} />
              <Row>
                <Col sm="4">
                  <Form onSubmit={this.handleSubmitPost}>
                    <Button type="submit" color="warning">
                      Fjern innlegg
                    </Button>
                  </Form>
                </Col>
                <Col sm="4">
                  <Form onSubmit={this.handleSubmitUserHide}>
                    <Button type="submit" color="warning">
                      Forby bruker
                    </Button>
                  </Form>
                </Col>
                <Col sm="4">
                  <Form onSubmit={this.handleSubmitUserDelete}>
                    <Button type="submit" color="danger">
                      Slett bruker
                    </Button>
                  </Form>
                </Col>
              </Row>
              {this.state.flaggings.map((flaggingElem, index) => (
                <Flagging
                  flaggingData={flaggingElem}
                  user={this.state.user}
                  key={`flag_${index}`}
                  handleClick={this.props.handleClick}
                />
              ))}
            </Col>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(FlagFeed);
