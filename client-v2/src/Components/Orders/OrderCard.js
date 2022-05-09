import React, { Component } from "react";
import './OrderCard.css'
class OrderCard extends Component {
constructor(props) {
  super(props)

  this.state = {
        dropdown:false,
  }
}

    handleDropDown=()=>{

        this.setState({
            dropdown:!this.state.dropdown
        })
    }

  render() {

    let total=0
    let count=0
    const { cartItems,productsList } = this.props;
    // console.log(cartItems);
    const cartDetails = Object.keys(cartItems);
    // console.log(cartDetails);
    return (
      <div className="ordercard ">
        <h3> OrderID:{this.props.orderId.slice(0, 5)}</h3>
        <button className={'dropdown-btn'} onClick={this.handleDropDown}>Items Details</button>
        {this.state.dropdown&&<div className="itemDetails">
        <ul>
          {cartDetails.map((item, index) => {
              count++
              total+=productsList[item].price
              return(
            <li key={index}>{productsList[item].name}</li>
          )})}
        </ul>
        <p>Total Items:{count}</p>
        <p>Amount:{total}</p>
        </div>
        }
        
      </div>
    );
  }
}

export default OrderCard;
