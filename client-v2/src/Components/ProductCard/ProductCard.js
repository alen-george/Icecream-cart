import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./ProductCard.css";

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDecrement: true,
    };
  }

  render() {
    return (
    
      <div className={"card " + this.props.id}>
        <Link to={`/product/${this.props.id}` } className={'link'}>
        <div className="img">
          <img src={this.props.link} alt={"Image of " + this.props.name} />
        </div>
        </Link>
        <h4>{this.props.name}</h4>
        <p>Rs:{this.props.price}</p>

        <p>
          <span>
            <button
              className={"increment"}
              onClick={() => this.props.increment(this.props.id)}
            >
              +
            </button>
          </span>

          <span>
            {(
              <button
                className={"decrement"}
                onClick={() => this.props.decrement(this.props.id)}
              >
                -
              </button>
            )}
          </span>
        </p>
        {<p>Quantity:{this.props.quantity}</p>}
        <p>
          {(
            <button
              className="addToCart"
              onClick={() => this.props.updateCart(this.props.id)}
            >
              Add to Cart
            </button>
          )}
        </p>
      </div>
    );
  }
}

export default ProductCard;
