import {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: []}

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    this.setState(prevState => {
      const isCartItemPresent = prevState.cartList.find(
        eachItem => eachItem.dishId === product.dishId,
      )

      if (isCartItemPresent) {
        return {
          cartList: prevState.cartList.map(eachItem => {
            if (eachItem.dishId === product.dishId) {
              return {...eachItem, count: eachItem.count + product.count}
            }
            return {...eachItem}
          }),
        }
      }
      return {cartList: [...prevState.cartList, product]}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.dishId !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.dishId === id) {
          return {...eachItem, count: eachItem.count + 1}
        }
        return {...eachItem}
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const quantityOfCartItem = prevState.cartList.find(
        eachItem => eachItem.dishId === id,
      ).count
      if (quantityOfCartItem === 1) {
        return {
          cartList: prevState.cartList.filter(
            eachItem => eachItem.dishId !== id,
          ),
        }
      }
      return {
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.dishId === id) {
            return {...eachItem, count: eachItem.count - 1}
          }
          return {...eachItem}
        }),
      }
    })
  }

  render() {
    const {cartList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
