import React, { Component, Fragment } from "react";
import HeaderBar from "../components/HeaderBar";
import PostForm from "../components/postForm/PostForm";

/*
 * Siden med skjema for å opprette nye innlegg.
 */
export class CreatePostPage extends Component {
  render() {
    return (
      <Fragment>
        <HeaderBar user={this.props.user} reloadApp={this.props.reloadApp} />
        <PostForm user={this.props.user} />
      </Fragment>
    );
  }
}

export default CreatePostPage;
