import React, { Component, Fragment } from "react";
import { Col, Row } from "reactstrap";
import HeaderBar from "../components/HeaderBar";
import Feed from "../components/feed/Feed";
import FlagFeed from "../components/FlagFeed";
/*
 * Adminside som kan nås fra toppmenyen (navbar).
 */

export class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: undefined,
    };
  }
  handleClick = (post) => {
    this.setState({ post: post });
    this.forceUpdate();
  };

  render() {
    return (
      <Fragment>
        <HeaderBar user={this.props.user} reloadApp={this.props.reloadApp} />
        <Row style={{ maxWidth: "100vw" }}>
          <Col sm="6">
            <Feed
              handleClick={this.handleClick}
              sort={"-flag_count"}
              staticFilters={[
                {
                  filteron: "hidden",
                  filterop: "==",
                  filtervalue: "0",
                },
              ]}
              postOptions={{
                showSoldButton: false,
                showFlag: false,
                showFlagNums: true,
              }}
            />
          </Col>
          <Col sm="6">
            {this.state.post && (
              <FlagFeed
                handleClick={this.handleClick}
                post={this.state.post}
                user={this.props.user}
              />
            )}
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default AdminPage;
