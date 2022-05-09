import React, { Component } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      logMessage: true,
    };
  }

  callAPI = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if (result.code === 200) {
          this.setState(
            {
              products: result.response.data,
            },
            () => this.props.getProduct(this.state.products)
          );
        } else {
          this.setState({
            logMessage: "HTTP 404 - No Response",
          });
        }
      });
  };

  componentDidMount() {
    this.callAPI("http://localhost:9000/testAPI");
  }
  render() {
    return (
      <div className="products">
        {Object.keys(this.state.products).length ? (
          Object.values(this.state.products).map((item,index) => {
            return (
              <ProductCard
                key={index}
                id={index+1}
                name={item.name}
                link={item.link}
                price={item.price}
                quantity={this.props.items?.[index+1]?.quantity||0}
                // fCart={item}
                updateCart={this.props.updateCart}
                increment={this.props.increment}
                decrement={this.props.decrement}
              ></ProductCard>
            );
          })
        ) : (
          <h2 className={"error"}>{this.state.logMessage}</h2>
        )}
      </div>
    );
  }
}

export default Home;
