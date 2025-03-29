import './index.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'

const Navbar = props => {
  const {restaurantName, cartItemsCount} = props

  return (
    <nav className="nav-container">
      <div className="nav-responsive-container">
        <h1 className="nav-heading">{restaurantName}</h1>
        <div className="my-orders-cart-conatainer">
          <p className="my-orders">My Orders</p>
          <div className="cart-container">
            <AiOutlineShoppingCart className="cart-icon" />
            <span className="cart-badge">{cartItemsCount}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
