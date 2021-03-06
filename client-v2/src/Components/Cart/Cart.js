import React, { Component } from "react";
import CartItem from "./CartItem";
import "./Cart.css";

export class Cart extends Component {
 
  render() {
    const { productsList, myCart, items, placeOrder, currOrderId } = this.props;
    console.log(currOrderId);
    const cartData = Object.keys(myCart || []);
    // console.log(cartData);
    return (
      <section className="cart">
        {!items ? (
          <div className="no-items-cart">
            <img
              src={
                "https://sethisbakery.com/assets/website/images/empty-cart.png"
              }
              alt={"Empty Cart!!..Add Items Please"}
            />
          </div>
        ) : !!currOrderId ? (
          <div className="cartItems">
            {cartData.map((prodId) => {
              // console.log(productsList);
              const item = productsList[prodId];
              return (
                <CartItem
                  key={prodId}
                  id={prodId}
                  link={item.link}
                  name={item.name}
                  price={item.price}
                  quantity={myCart[prodId].quantity}
                  updateCart={this.props.updateCart}
                  increment={this.props.increment}
                  decrement={this.props.decrement}
                  remove={this.props.remove}
                  currOrderId={this.props.currOrderId}
                />
              );
            })}
          </div>
        ) : (
          <div className="error">
            <img
              src={
                "https://i.pinimg.com/originals/0d/d5/23/0dd5234b9d72142cff71caf3eb71c321.png"
              }
              alt={"Order Placed.Thank you for shopping"}
            />
          </div>
        )}
        {!!items && (
          <div className={"bill"}>
            <h3>Total Items:{this.props.items}</h3>
            <h3>Total Amount:{this.props.total}</h3>

            <button onClick={()=>placeOrder()}>Place Order</button>
          </div>
        )}
      </section>
    );
  }
}

export default Cart;



 // console.log(prevProp.items,prevState.fetchStatus,this.state.items);
    // console.log(prevProp.currOrderId);
    // prevProp.items!==this.props.items&&
    // && this.state.items
    //  && prevProp.currOrderId === 0


     // constructor(props) {
  //   super(props);

  //   this.state = {
  //     fetchStatus: true,
  //     order:false
  //   };
  // }

  // componentDidMount() {
  //   if (this.props.items)
  //     this.setState({
  //       fetchStatus: false,
  //     });
  // }
  // componentDidUpdate(prevProp, prevState) {
   
  //   if (prevProp.currOrderId!==this.props.currOrderId )
  //     this.setState({
  //       fetchStatus: false,
  //     });
  // }