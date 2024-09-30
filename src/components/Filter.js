import React, { Component } from "react";
import Feed from "./feed/Feed.js";
import {
  Button,
  Input,
  Row,
  Col,
  Label,
  FormGroup,
  ButtonGroup,
} from "reactstrap";
/*
En klasse som inneholder en meny for å velge filtere og en feed som er filtrert på filterene som er valgt
*/
export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_type: "sell",
      event_type: undefined,
      price: -1,
      sort: "flag_count",
      staticFilters: this.props.staticFilters,
    };
  }
  /**
   * Oppdaterer post type. Må være den ene eller den andre
   */
  onChangePostType() {
    if (this.state.post_type === "sell") {
      this.setState({ post_type: "buy" });
    } else {
      this.setState({ post_type: "sell" });
    }
  }
  /**
   * Henter verdiene ifra state og formaterer det til filtere som kan bli sendt som props til Feed.js
   * @returns En liste over filterne som skal brukes i get requesten til Feed.
   */
  getFilters() {
    this.getterFilters = [
      {
        filteron: "post_type",
        filterop: "==",
        filtervalue: this.state.post_type,
      },
    ];
    if (
      !isNaN(parseInt(this.state.price)) &&
      this.state.price !== null &&
      parseInt(this.state.price) !== -1
    ) {
      this.getterFilters.push({
        filteron: "price",
        filterop: "<=",
        filtervalue: parseInt(this.state.price),
      });
    }
    if (this.state.event_type !== undefined) {
      this.getterFilters.push({
        filteron: "event_type",
        filterop: "==",
        filtervalue: this.state.event_type,
      });
    }
    for (let i = 0; i < this.props.staticFilters.length; i++) {
      this.getterFilters.push(this.props.staticFilters[i]);
    }
    return this.getterFilters;
  }
  /**
   * Returnerer strengen som skal søkes etter dersom Filter.js ligger inni en Search.js
   * @returns en string som skal søkes etter
   */
  getSearch() {
    return this.props.search;
  }
  /**
   * Setter teksten i sortere-knappen
   * @param {string} type
   * @returns en <span> med teksten som skal i sortere-på-pris-knappen
   */
  getSortStr(type) {
    if (type === "flag_count") {
      if (this.state.sort === "-flag_count") {
        return <span>"Pris &uarr;"</span>;
      } else {
        return <span>"Pris &darr;"</span>;
      }
    }
  }
  /**
   * Tegner en Filter komponent
   * @returns en <Filter/> komponent
   */
  render() {
    return (
      <div className="container" id="mainDivf" style={{ position: "absolute" }}>
        <div id="postContainerf">
          <Row>
            <Col sm="4" style={{ marginTop: "80px" }}>
              <FormGroup style={{ width: "280px" }}>
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
              <FormGroup style={{ width: "280px" }}>
                <Label>Type arrangement</Label>
                <Input
                  id="eventInp"
                  onChange={(e) => {
                    this.setState({ event_type: e.target.value });
                  }}
                  type="select"
                  value={this.state.event_type}
                >
                  <option value={"Konsert"}>Konsert</option>
                  <option value={"Sportsarrangement"}>Sportarrangement</option>
                  <option value={"Teater"}>Teater</option>
                  <option value={"Foredrag"}>Foredrag</option>
                </Input>
              </FormGroup>

              <FormGroup style={{ width: "280px" }}>
                <Label for="priceInp">Maks pris</Label>
                <ButtonGroup>
                  <Input
                    id="priceFil"
                    onChange={(e) => {
                      this.setState({ price: e.target.value });
                    }}
                    type="number"
                    value={this.state.price}
                    min={-1}
                  />
                  <Button
                    style={{ minWidth: "100px" }}
                    onClick={() => {
                      if (this.state.sort === "-flag_count") {
                        this.setState({ sort: "flag_count" });
                      } else {
                        this.setState({ sort: "-flag_count" });
                      }
                    }}
                    color="primary"
                  >
                    {this.getSortStr("flag_count")}
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
            <Col sm="8">
              <Feed
                filters={this.getFilters()}
                search={this.getSearch()}
                sort={this.state.sort}
                postOptions={this.props.postOptions}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
