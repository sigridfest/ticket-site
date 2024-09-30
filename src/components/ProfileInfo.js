import React, { Component } from "react";
import { Row, CardText, Col, CardImg, Input } from "reactstrap";
import axios from "axios";

/*
 * Øvre del av profilsiden som gir informasjon om brukeren,
 * slik som brukernavn, e-post og profilbilde.
 * Profilbildet kan endres.
 */
export class ProfileInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileImgURL: `${this.props.profile.profile_image}`,
    };

    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  /*
   * Sender en PUT-forespørsel til backend med den nye bildefilen.
   * brukerens id oppgis i url-en. Bildefilen må pakkes inn i
   * et FormData-objekt.
   */
  handleImageUpload(evt) {
    let formData = new FormData();
    formData.append("profile_image", evt.target.files[0]);

    axios
      .patch(`http://localhost:8000/api/users/${this.props.user.id}/`, formData)
      .then((response) => {
        // Frisker opp igjen hele nettsiden for å hente den oppdaterte versjonen av brukeren.
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col
            sm="4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "160px",
                height: "160px",
                marginTop: "20px",
                display: "flex",
                overflow: "hidden",
                alignItems: "center",
                borderRadius: "100%",
                border: "solid 1px black",
                backgroundColor: "white",
              }}
            >
              <CardImg alt="" width="100%" src={this.state.profileImgURL} />
            </div>
            {this.props.user.id === this.props.profile.id && (
              <Input
                style={{
                  margin: "16px 0 0 0",
                }}
                type="file"
                onChange={this.handleImageUpload}
              />
            )}
          </Col>
          <Col
            sm="6"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardText tag="h1" style={{ marginTop: "48px", fontSize: "64px" }}>
              {this.props.profile.username}
            </CardText>
            <CardText tag="h5">
              <span style={{ fontWeight: "bold" }}>E-post</span> &ensp;{" "}
              {this.props.profile.email}
            </CardText>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfileInfo;
