import React, { Component } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: false,
    };
  }

  handleMobileView = () => {
    this.setState({
      mobile: !this.state.mobile,
    });
  };
  render() {
    return (
      <nav>
        <button onClick={this.handleMobileView} className={styles.hams}>
          <img src="/images/icon-hamburger.svg" alt="mobile view button" />
        </button>

        <ul className={styles.navBar}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className={"hi"}>
            <Link to="/mycart">My Cart</Link>
          </li>
          <li>
            <Link to="/myorders">My Orders</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
