import React, { Component } from "react";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import HeaderBar from "../components/HeaderBar";
import ProfileInfo from "../components/ProfileInfo";
import Feed from "../components/feed/Feed";
import axios from "axios";
import { withRouter } from "react-router-dom";

export class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mine: false,
      mayRender: false,
      profile: null,
      userIDParam: new URLSearchParams(window.location.search).get("user_id"),
    };
  }

  componentDidMount() {
    this.setProfile(this.state.userIDParam);
  }

  setProfile(userIDParam) {
    if (userIDParam) {
      if (userIDParam === String(this.props.user.id))
        this.setState({ mine: true });

      this.getProfileUser(userIDParam).then((profile) =>
        this.setState({ mayRender: true, profile: profile })
      );
    } else {
      this.props.history.push(`/profile-page/?user_id=${this.props.user.id}`);
      window.location.reload(false);
    }
  }

  getProfileUser = async (profileId) => {
    return await axios
      .get(`http://localhost:8000/api/users/${profileId}/`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  /* React oppdaterer ikke automatisk ved endring av query params
   * Derfor må brukeren hentes på nytt gjennom componentDidUpdate.
   * Problemet oppstår når man er på en annens profil og ønsker å
   * gå til sin egen profil.
   */
  componentDidUpdate(prevProps) {
    const userIDParam = new URLSearchParams(window.location.search).get(
      "user_id"
    );
    if (this.state.userIdParam !== userIDParam) {
      this.setState({
        mayRender: false,
        userIdParam: userIDParam,
      });
      this.setProfile(userIDParam);
    }
  }

  render() {
    return (
      <div>
        <HeaderBar user={this.props.user} reloadApp={this.props.reloadApp} />
        {this.state.mayRender && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{ width: "75vw", marginTop: "20px" }}>
              <CardHeader
                style={{
                  color: "white",
                  backgroundColor: "#e3735e",
                  boxShadow: "0 2px 2px 0px #aaa",
                }}
              >
                <ProfileInfo
                  user={this.props.user}
                  profile={this.state.profile}
                />
              </CardHeader>
              {this.state.mine && (
                <CardBody>
                  <CardText
                    tag="h2"
                    style={{ marginLeft: "48px", fontSize: "36px" }}
                  >
                    Mine innlegg
                  </CardText>
                  <Feed
                    staticFilters={[
                      {
                        filteron: "ownerfk_id__id",
                        filterop: "===",
                        filtervalue: this.props.user.id,
                      },
                    ]}
                    postOptions={{
                      showSoldButton: true,
                      showFlag: false,
                      showFlagNums: false,
                    }}
                  />
                </CardBody>
              )}
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ProfilePage);
