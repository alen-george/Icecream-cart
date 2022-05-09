import React, { Component } from "react";
import OrderCard from "./OrderCard";
import "./Orders.css";
class Orders extends Component {
  render() {
    const { ordersList, productsList, lastOrderId } = this.props;
    const orders = Object.keys(ordersList);
    // console.log(orders);

    return (
      <section>
        <div className="Order">
          {lastOrderId && (
            <div className="order-success">
              <div className="order-success-img">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/eshop/380/4-512.png"
                  alt="order Success message"
                />
              </div>
              <p>
                Your Order with <b>id:{lastOrderId.slice(0, 5)}</b> has been
                recevied and be delivered to you soon.
              </p>
              <p>Have an Ice Cream Day</p>
            </div>
          )}

          {!!orders.length ? (
            <div className="past-orders">
              <h2>Previous Orders</h2>
              {orders.map((item, index) => {
                if (item === lastOrderId) {
                  return "";
                }
                const cartItems = ordersList[item];
                // console.log(cartItems);

                return (
                  <OrderCard
                    key={index}
                    // total={total}
                    orderId={item}
                    // totalItems={totalItems}
                    productsList={productsList}
                    cartItems={cartItems}
                  />
                );
              })}
            </div>
          ) : (
            <div className="no-order">
            <img
              src="https://i.pinimg.com/originals/ff/3d/66/ff3d66d438ddff2c520db4d26fce8760.jpg"
              alt={"No order"}
            />
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default Orders;
