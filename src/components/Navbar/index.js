import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'
import CartContext from '../../context/CartContext'

const Navbar = props => {
  const {restaurantName} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <nav className="nav-container">
            <div className="nav-responsive-container">
              <Link to="/" className="nav-link">
                <h1 className="nav-heading">{restaurantName}</h1>
              </Link>
              <div className="my-orders-cart-conatainer">
                <p className="my-orders">My Orders</p>
                <Link to="/cart" className="nav-link">
                  <button
                    type="button"
                    className="cart-container"
                    data-testid="cart"
                  >
                    <AiOutlineShoppingCart className="cart-icon" />
                    <span className="cart-badge">{cartList.length}</span>
                  </button>
                </Link>
                <button type="button" className="nav-logout" onClick={onLogout}>
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Navbar)
