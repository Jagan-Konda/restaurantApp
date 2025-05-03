import './index.css'
import CartContext from '../../context/CartContext'

const CartListItem = props => {
  const {cartItemDetails} = props
  const {
    dishId,
    dishName,
    dishImage,
    dishCurrency,
    dishPrice,
    count,
  } = cartItemDetails
  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onRemove = () => {
          removeCartItem(dishId)
        }

        const onIncrement = () => {
          incrementCartItemQuantity(dishId)
        }

        const onDecrement = () => {
          decrementCartItemQuantity(dishId)
        }

        return (
          <li className="cart-list-item">
            <div className="cart-list-item-details-container">
              <p className="cart-list-item-dish-name">{dishName}</p>

              <p className="cart-list-item-dish-price">
                {dishCurrency} {dishPrice * count}
              </p>
              <div className="cart-list-item-count-container">
                <button
                  type="button"
                  className="count-button"
                  onClick={onDecrement}
                >
                  -
                </button>
                <p className="count">{count}</p>
                <button
                  type="button"
                  className="count-button"
                  onClick={onIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <div className="dish-img-remove-btn-container">
              <img
                src={dishImage}
                alt={dishName}
                className="cart-list-item-image"
              />
              <button
                type="button"
                className="cart-list-item-remove"
                onClick={onRemove}
              >
                Remove
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartListItem
