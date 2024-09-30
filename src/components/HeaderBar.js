import React, { Component } from "react";
import {
  Navbar,
  NavItem,
  Nav,
  UncontrolledPopover,
  Button,
  NavbarText,
} from "reactstrap";
import "./HeaderBar.css";
import { NavLink, Link } from "react-router-dom";

class HeaderBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "anonymous",
      isAdmin: false,
    };
  }

  componentDidMount() {
    if (this.props.user != null) {
      this.setState({
        username: this.props.user.username,
        isAdmin: this.props.user.is_admin,
      });
    }
  }

  logout() {
    sessionStorage.clear();
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        <Navbar
          id="headerBar"
          expand="sm"
          dark
          style={{ boxShadow: "0 2px 2px 1px #ddd" }}
        >
          {this.state.username !== null && (
            <Nav id="headerNav" navbar>
              <NavItem>
                <NavLink to="/" id="headerBarBrand">
                  Luka
                </NavLink>
              </NavItem>

              <NavItem className="headerItem">
                <NavLink
                  className="headerLink"
                  to="/create-post/"
                  activeStyle={{ opacity: 0.7 }}
                >
                  Nytt innlegg
                </NavLink>
              </NavItem>
              {this.state.isAdmin && (
                <NavItem className="headerItem">
                  <NavLink
                    id="adminPage"
                    className="headerLink"
                    to="/admin-page/"
                    activeStyle={{ opacity: 0.7 }}
                  >
                    Adminside
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          )}
          <NavbarText
            style={{
              fontSize: "24px",
              color: "white",
              position: "absolute",
              right: "90px",
            }}
          >
            {this.props.user.username}
          </NavbarText>
          <div
            id="profile_icon"
            style={{
              width: "54px",
              height: "54px",
              backgroundColor: "white",
              border: "solid black 1px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "absolute",
              right: "20px",
            }}
          >
            <img
              alt=""
              width="100%"
              src={`http://localhost:8000${this.props.user.profile_image}`}
            />
          </div>
          <UncontrolledPopover
            target="profile_icon"
            trigger="legacy"
            placement="bottom"
          >
            <Link to={`/profile-page/?user_id=${this.props.user.id}`}>
              {" "}
              <Button
                color="primary"
                style={{
                  width: "100px",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                profil{" "}
              </Button>
            </Link>{" "}
            <br />
            <Button
              color="danger"
              onClick={this.logout}
              style={{
                width: "100px",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              logg ut{" "}
            </Button>{" "}
          </UncontrolledPopover>
        </Navbar>
      </div>
    );
  }
}

export default HeaderBar;
