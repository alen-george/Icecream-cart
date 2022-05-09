import React from 'react'
import {useParams} from 'react-router-dom'
import './ProductRoute.css'
function ProductRoute(props) {

    const route = useParams().id
    console.log(props.productsList);

    const {name,price,link}=props.productsList[route]
    console.log(route);

  return <div className={"card1 " + route}>
    <div className="img1">
      <img src={link} alt={"Image of " + name} />
    </div>
    <h4>{name}</h4>
    <p>Rs:{price}</p>

    <p className='ChangeQuantity'>
      <span className={"increment1"}>
        <button
          
          onClick={() => props.increment(route)}
        >
          +
        </button>
      </span>

      <span className={"decrement1"}>
        { (
          <button
            
            onClick={() => props.decrement(route)}
          >
            -
          </button>
        )}
      </span>
    </p>
    <p>Quantity:{props.items[route]?.quantity}</p>
    <p className='addCart'>
      {(
        <button
          className="addToCart1"
          onClick={() => props.updateCart(route)}
        >
          Add to Cart
        </button>
      )}
    </p>
  </div>

      }

export default ProductRoute