import React, { Component } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // products: [],
      logMessage: "HTTP 404 - No Response",
    };
  }

  // 

  componentDidMount() {
    this.props.getProductsLists("http://localhost:9000/home");
  }
  render() {
    return (
      <div className="products">
        {Object.keys(this.props.products).length ? (
          Object.values(this.props.products).map((item,index) => {
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


// callAPI = (url) => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       // console.log(result);
  //       if (result.code === 200) {
  //         this.setState(
  //           {
  //             products: result.response.data,
  //           },
  //           // () => this.props.getProduct(this.callAPI)
  //         );
  //       } else {
  //         this.setState({
  //           logMessage: "HTTP 404 - No Response",
  //         });
  //       }
  //     });
  // };