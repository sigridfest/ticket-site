import React, { Component } from "react";
import Feed from "./feed/Feed.js";
import Filter from "./Filter.js";
import { withRouter } from "react-router-dom";
import { Button, Input, Form, ButtonGroup } from "reactstrap";

/*
  Opprett klassen med <Search childType = "feed" /> hvis du kun vil ha feed, eller 
  <Search childType = "filter" /> hvis du vil ha feed med filter og search.
  */
export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child: this.props.childType,
      temporarySearch: undefined,
      search: undefined,
      staticFilters: this.props.staticFilters,
    };
  }
  /**
   * Bestemmer om Search komponenten skal inneholde en Feed, eller en Filter med en Feed i seg.
   * @returns enten <Filter/> eller <Feed/>
   */
  getChildType() {
    if (this.props.childType === "feed") {
      return (
        <Feed
          search={this.state.search}
          staticFilters={this.props.staticFilters}
          postOptions={this.props.postOptions}
        />
      );
    } else if (this.props.childType === "filter") {
      return (
        <Filter
          search={this.state.search}
          staticFilters={this.props.staticFilters}
          postOptions={this.props.postOptions}
        />
      );
    }
  }
  /**
   * Oppdaterer search ifra inputfeltet
   * @param {submit_event} e
   */
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ search: this.state.temporarySearch });
  };

  /**
   * Tegner classen. Inputen gjøres gjennom en form.
   * @returns en <Search> komponent
   */
  render() {
    return (
      <div
        className="container"
        id="searchDiv"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {this.getChildType()}

        <Form
          style={{ marginTop: "20px", marginLeft: "15px", width: "300px" }}
          id="search_form"
          onSubmit={this.handleSubmit}
        >
          <ButtonGroup>
            <Input
              id="titleSearch"
              type="text"
              placeholder="Søk"
              maxLength={25}
              onChange={(evt) =>
                this.setState({
                  ...this.state,
                  temporarySearch: evt.target.value,
                })
              }
            />
            <Button
              color="primary"
              type="submit"
              style={{ marginBottom: "10px" }}
            >
              Search
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    );
  }
}

export default withRouter(Search);
