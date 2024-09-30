import React, { Component } from "react";
import Post from "../Post.js";
import { Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import getUser from "../getUser.js";
import "./Feed.css";
import axios from "axios";

/**
 * En feed som genererer en liste med <Post> komponenter for å vise innlegg
 * Tar inn filtere, sorteringsattributt og search som props
 */
export class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filters: props.filters,
      sortattr: props.sortattr,
      staticFilters: this.props.staticFilters,
      user: null,
    };
  }
  /**
   * Kjører en get request når komponenten blir mountet.
   */
  componentDidMount() {
    getUser().then((user) => this.setState({ user: user }));
    this.getPosts();
  }
  /**
   * Sjekker om props har endret seg, og kjører en get request for å oppdatere feeden dersom de har det.
   * @param {props} prevProps det forrige settet med props som komponenten hadde
   */
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.filters) !== JSON.stringify(this.props.filters)
    ) {
      this.getPosts();
    } else if (
      JSON.stringify(prevProps.sort) !== JSON.stringify(this.props.sort)
    ) {
      this.getPosts();
    } else if (prevProps.search !== this.props.search) {
      this.getPosts();
    }
  }
  /**
   * Sender en GET request til serveren med alle filterene og sorteringsattributtene som er spesifisert.
   * this.props.search gjøres om til et filter.
   * Verdiene blir puttet inn i this.state.posts.
   */
  getPosts() {
    var getterParams = [];
    if (this.props.filters !== undefined) {
      for (let i = 0; i < this.props.filters.length; i++) {
        getterParams.push(this.props.filters[i]);
      }
    }
    if (this.props.staticFilters !== undefined) {
      for (let i = 0; i < this.props.staticFilters.length; i++) {
        getterParams.push(this.props.staticFilters[i]);
      }
    }
    if (this.props.search !== undefined) {
      getterParams.push({
        filteron: "title",
        filterop: "search",
        filtervalue: this.props.search,
      });
    }
    var getterSort;
    if (this.props.sort !== undefined) {
      getterSort = this.props.sort;
    }
    axios
      .get("http://localhost:8000/api/list-post/", {
        headers: {
          "Content-Type": "application/json",
        },
        params: { filters: getterParams, sortattr: getterSort },
      })
      .then((response) => this.setState({ posts: response.data }))
      .catch((error) => console.log(error));
  }
  /**
   * Tegner en <Feed> komponent
   * @returns en <Feed> komponent
   */
  render() {
    return (
      <div
        className="container"
        id="mainDiv"
        style={{
          width: "550px",
        }}
      >
        {this.state.user !== null && (
          <div id="postContainer">
            <Col sm="12" id="postCol" style={{ marginTop: "20px" }}>
              {this.state.posts.length <= 0 && (
                <p style={{ textAlign: "center", color: "#777" }}>
                  Her var det tomt!
                  <br /> Det finnes ingen innlegg for øyeblikket.
                </p>
              )}
              {this.state.posts.map((postElem, index) => (
                <Post
                  postData={postElem}
                  user={this.state.user}
                  key={`post_${index}`}
                  postOptions={this.props.postOptions}
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

export default withRouter(Feed);
