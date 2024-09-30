import React, { Component, Fragment } from "react";
import Search from "../components/Search";
import HeaderBar from "../components/HeaderBar";

/*
 * Hovedsiden med url'/' som viser innleggsstrømmen.
 */
export class MainPage extends Component {
  render() {
    return (
      <Fragment>
        <HeaderBar user={this.props.user} reloadApp={this.props.reloadApp} />

        <Search
          childType="filter"
          staticFilters={[
            {
              filteron: "completed",
              filterop: "==",
              filtervalue: "0",
            },
            {
              filteron: "hidden",
              filterop: "==",
              filtervalue: "0",
            },
          ]}
          postOptions={{
            showSoldButton: false,
            showFlag: true,
            showFlagNums: false,
          }}
        />
      </Fragment>
    );
  }
}

export default MainPage;
