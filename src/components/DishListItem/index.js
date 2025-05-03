import './index.css'
import CartContext from '../../context/CartContext'

const DishListItem = props => {
  const {dishDetails, onCountIncrement, onCountDecrement, count} = props
  const {
    dishName,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishPrice,
    dishType,
    addOnCat,
  } = dishDetails

  const onIncrement = () => {
    onCountIncrement(dishId)
  }

  const onDecrement = () => {
    onCountDecrement(dishId)
  }

  const dishTypeContainer =
    dishType === 2
      ? 'dish-type-container dish-type-2-container'
      : 'dish-type-container dish-type-1-container'
  const dishTypeIndicator =
    dishType === 2
      ? 'dish-type-indicator dish-type-2-indicator'
      : 'dish-type-indicator dish-type-1-indicator'

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onAddToCart = () => {
          addCartItem({...dishDetails, count})
        }

        return (
          <li className="dish-list-item">
            <div className="dish-item-details-type-container">
              <div className={dishTypeContainer}>
                <div className={dishTypeIndicator}> </div>
              </div>
              <div className="dish-item-details-container">
                <h1 className="dish-item-name">{dishName}</h1>

                <p className="dish-currency">
                  {dishCurrency} {dishPrice}
                </p>

                <p className="dish-description">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="dish-item-count-container">
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
                ) : (
                  <p className="not-available">Not Available</p>
                )}
                {addOnCat.length !== 0 && (
                  <p className="dish-customizations">
                    Customizations available
                  </p>
                )}
                {dishAvailability && count > 0 && (
                  <button
                    type="button"
                    className="add-to-cart-button"
                    onClick={onAddToCart}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
            <div className="dish-calories-img-container">
              <p className="dish-calories">{dishCalories} Calories</p>
              <img src={dishImage} className="dish-image" alt={dishName} />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishListItem
