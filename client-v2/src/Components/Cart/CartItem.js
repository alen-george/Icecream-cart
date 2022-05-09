import React, { Component } from "react";
import "./CartItem.css";

class CartItem extends Component {
  // constructor(props) {
  //   super(props);

  //   // this.state = {
     
  
  //   // };
  // }

  
  // componentDidUpdate(){
  //   this.props.updateCart((this.props.id,this.state.quantity,this.state.remove))
  // }

  render() {
    return (
      <>
      <div className="cart-item">
        <div>
        <img src={this.props.link} alt={"cart product"} />
        </div>
        <div>
          <h4>{this.props.name}</h4>
          <h4 className="item-price">Rs: {this.props.price}</h4>

          <button
            className="remove-btn"
            onClick={()=>this.props.remove(this.props.id,()=> this.props.updateCart(this.props.id,this.props.currOrderId))}
          >
            Remove
          </button>
        </div>
        <div>
          <button className="amount-btn" onClick={()=>{
            this.props.increment(this.props.id,()=> this.props.updateCart(this.props.id,this.props.currOrderId)) 
           
            }
            }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
            </svg>
          </button>

          <p className="amount">{this.props.quantity}</p>

          <button className="amount-btn" onClick={()=>{
            this.props.decrement(this.props.id,()=>this.props.updateCart(this.props.id,this.props.currOrderId))
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
        </div>
      </div>
      </>
    );
  }
}

export default CartItem;
