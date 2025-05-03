import {Link} from 'react-router-dom'

import Navbar from '../Navbar'
import CartListItem from '../CartListItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onRemoveAll = () => {
        removeAllCartItems()
      }

      const renderCartItemsView = () => (
        <div className="cart-items-responsive-container">
          <button
            type="button"
            className="cart-items-remove-all-button"
            onClick={onRemoveAll}
          >
            Remove All
          </button>
          <ul className="cart-items-container">
            {cartList.map(eachCartItem => (
              <CartListItem
                cartItemDetails={eachCartItem}
                key={eachCartItem.dishId}
              />
            ))}
          </ul>
        </div>
      )

      const renderNoCartItemsView = () => (
        <div className="no-cart-items-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="no-cart-items"
            className="no-cart-image"
          />
          <Link to="/" className="link">
            <button type="button" className="no-cart-home-button">
              Home
            </button>
          </Link>
        </div>
      )

      return (
        <>
          <Navbar restaurantName="UNI Resto Cafe" />
          <div className="cart-bg-container">
            {cartList.length > 0
              ? renderCartItemsView()
              : renderNoCartItemsView()}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
