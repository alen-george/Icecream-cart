import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Orders from "./Components/Orders/Orders";
import NoMatchFound from "./Components/NoMatchFound/NoMatchFound";
import { v4 as uuidv4 } from "uuid";

import React, { Component } from "react";
import ProductRoute from "./Components/ProductCard/ProductRoute";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: {},
      cart: {},
      item: {},
      total: 0,
      orderId: 0,
      lastOrderId: "",
      fetchStatus: "",
    };
  }

  getProduct = (productsList) => {
    this.setState({
      products: productsList,
    });
  };

  fetchCartData = () => {
    fetch("http://localhost:9000/testAPI/cart")
      .then((res) => {     
        console.log(res);
        if (res.status === 200) {
          return res.json()
        } 
        // else {
        //   this.setState({ fetchStatus: "Error" });
        // }
        return res.json()
        
      })
      .then((result) => {
        console.log(result);
        this.setState({ cart: { ...result.cart } });
      });
  };

  postData = () => {
    fetch("http://localhost:9000/testAPI", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({cart:this.state.cart,items:this.state.item}),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };


  placeOrder = () => {
    
    this.setState((prevState) => ({
      item: {},
      orderId: 0,
      total: 0,
      lastOrderId: prevState.orderId,
    }),this.postData);
  };
  increment = (id, callback = () => {}) => {
    // console.log(this.state.products[id].price);
    this.setState(
      (prevState) => ({
        item: {
          ...prevState.item,
          [id]: {
            quantity:
              (prevState.item[id]?.quantity ? prevState.item[id].quantity : 0) +
              1,
          },
        },
        total: prevState.total + prevState.products[id].price,
      }),
      callback
    );
  };

  decrement = (id, callback = () => {}) => {
    this.setState((prevState) => {
      return {
        item: {
          ...prevState.item,
          [id]: {
            quantity:
              (prevState.item[id]?.quantity
                ? prevState.item[id]?.quantity
                : 1) - 1,
          },
        },
        total:
          prevState.total === 0
            ? 0
            : prevState.total - prevState.products[id].price,
      };
    }, callback);
  };

  updateCart = (id, orderCartId = 0) => {
    let uniqueId = uuidv4();
    if (orderCartId) {
      uniqueId = orderCartId;
    }

    this.setState((prevState) => {
      if (prevState.orderId && !orderCartId) {
        // console.log(uniqueId);
        return {
          cart: {
            ...this.state.cart,
            [prevState.orderId]: {
              ...this.state.cart[prevState.orderId],
              [id]: this.state.item[id],
              // total:this.state.total
            },
          },
          orderId: prevState.orderId,
        };
      } else {
        // console.log(uniqueId);
        return {
          cart: {
            ...this.state.cart,
            [uniqueId]: {
              // ...this.state.cart[uniqueId],
              // [id]: this.state.item[id],
              ...this.state.item,
              // total:this.state.total
            },
          },
          orderId: uniqueId,
        };
      }
    },this.postData);
    // console.log(this.state.cart);

    // console.log("Cart Updated");
  };

  remove = (id, callback = () => {}) => {
    const { [id]: deleted, ...filteredOject } = this.state.item;
    this.setState((prevState) => {
      return {
        item: { ...filteredOject },
        total:
          prevState.total === 0
            ? 0
            : prevState.total - this.state.products[id].price,
        orderId: prevState.total === 0 ? 0 : prevState.orderId,
      };
    }, callback);
  };

  componentDidMount(){
    this.fetchCartData()
  }

  render() {
    // console.log(this.state.item);
    // console.log(this.state.products);
    return (
      <>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={this.state.item}
                getProduct={this.getProduct}
                updateCart={this.updateCart}
                increment={this.increment}
                decrement={this.decrement}
              />
            }
          ></Route>
          <Route
            path="/mycart"
            element={
              <Cart
                myCart={this.state.cart[this.state.orderId]}
                currOrderId={this.state.orderId}
                productsList={this.state.products}
                updateCart={this.updateCart}
                increment={this.increment}
                decrement={this.decrement}
                remove={this.remove}
                total={this.state.total}
                items={Object.keys(this.state.item ?? []).length}
                placeOrder={this.placeOrder}
              />
            }
          ></Route>
          <Route
            path="/myorders"
            element={
              <Orders
                ordersList={this.state.cart}
                lastOrderId={this.state.lastOrderId}
                // totalItems={Object.keys(this.state.item ?? []).length}
                // total={this.state.total}
                productsList={this.state.products}
              ></Orders>
            }
          ></Route>
          <Route
            path="/product/:id"
            element={
              <ProductRoute
                items={this.state.item}
                productsList={this.state.products}
                updateCart={this.updateCart}
                increment={this.increment}
                decrement={this.decrement}
              />
            }
          ></Route>
          <Route path="*" element={<NoMatchFound />} />
        </Routes>
      </>
    );
  }
}

export default App;

// {
//   ...this.state.cart,
//   [id]: {
//     ...this.state.cart[id],
//     quantity: (prevState.cart[id].quantity??0) - 1,
//   },
// }

// quantity: prevState.quantity+1,
// else if (id === "remove") {
//   console.log(uniqueId);
//   return {
//     cart: {
//       ...this.state.cart,
//       [uniqueId]: {
//         ...this.state.item[id],
//       },
//     },
//     orderId: uniqueId,
//   };
// }
