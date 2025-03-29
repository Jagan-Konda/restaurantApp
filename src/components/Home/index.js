import {Component} from 'react'
import Navbar from '../Navbar'
import DishListItem from '../DishListItem'

import './index.css'

class Home extends Component {
  state = {
    restaurantDetails: {tableMenuList: []},
    activeCategoryId: '',
    cartItems: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  convertSnakeCaseToCamelCase = data => ({
    branchName: data.branch_name,
    nexturl: data.nexturl,
    restaurantId: data.restaurant_id,
    restaurantImage: data.restaurant_image,
    restaurantName: data.restaurant_name,
    tableId: data.tabel_id,
    tableName: data.table_name,
    tableMenuList: data.table_menu_list.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
      categoryDishes: each.category_dishes.map(eachDish => ({
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        dishCalories: eachDish.dish_calories,
        dishCurrency: eachDish.dish_currency,
        dishDescription: eachDish.dish_description,
        dishId: eachDish.dish_id,
        dishImage: eachDish.dish_image,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        nexturl: eachDish.nexturl,
        addOnCat: eachDish.addonCat.map(eachAddOnCat => ({
          addOnCategory: eachAddOnCat.add_on_category,
          addOnCategoryId: eachAddOnCat.add_on_category_id,
          addOnSelection: eachAddOnCat.add_on_selection,
          nexturl: eachAddOnCat.nexturl,
          addons: eachAddOnCat.addons.map(eachAddOn => ({
            dishAvailability: eachAddOn.dish_Availability,
            dishType: eachAddOn.dish_Type,
            dishCalories: eachAddOn.dish_calories,
            dishCurrency: eachAddOn.dish_currency,
            dishDescription: eachAddOn.dish_description,
            dishId: eachAddOn.dish_id,
            dishImage: eachAddOn.dish_Image,
            dishName: eachAddOn.dish_name,
            dishPrice: eachAddOn.dish_price,
          })),
        })),
      })),
    })),
  })

  getRestaurantDetails = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )

    const data = await response.json()
    const updatedData = this.convertSnakeCaseToCamelCase(data[0])

    this.setState({
      restaurantDetails: updatedData,
      activeCategoryId: updatedData.tableMenuList[0].menuCategoryId,
    })
  }

  onMenuCategoryChange = event => {
    this.setState({activeCategoryId: event.target.id})
  }

  onCountIncrement = id => {
    this.setState(prevState => {
      const itemExists = prevState.cartItems.find(
        eachItem => eachItem.dishId === id,
      )
      return {
        cartItems: itemExists
          ? prevState.cartItems.map(eachItem =>
              eachItem.dishId === id
                ? {...eachItem, count: eachItem.count + 1}
                : eachItem,
            )
          : [...prevState.cartItems, {dishId: id, count: 1}],
      }
    })
  }

  onCountDecrement = id => {
    this.setState(prevState => {
      const updatedCartItems = prevState.cartItems
        .map(eachItem =>
          eachItem.dishId === id && eachItem.count > 0
            ? {...eachItem, count: eachItem.count - 1}
            : eachItem,
        )
        .filter(eachItem => eachItem.count > 0)

      return {cartItems: updatedCartItems}
    })
  }

  render() {
    const {restaurantDetails, activeCategoryId, cartItems} = this.state
    const {restaurantName, tableMenuList} = restaurantDetails
    const activeCategoryDishes =
      tableMenuList.length !== 0
        ? tableMenuList.find(
            eachMenu => eachMenu.menuCategoryId === activeCategoryId,
          ).categoryDishes
        : []

    const cartItemsCount = cartItems.reduce(
      (acc, curVal) => acc + curVal.count,
      0,
    )

    return (
      <div className="bg-container">
        <Navbar
          restaurantName={restaurantName}
          cartItemsCount={cartItemsCount}
        />
        <ul className="table-menu-list-container">
          {tableMenuList.map(eachMenu => {
            const activeMenuButton =
              eachMenu.menuCategoryId === activeCategoryId
                ? 'table-menu-list-button active-table-list-button'
                : 'table-menu-list-button'
            return (
              <li
                className="table-menu-list-item"
                key={eachMenu.menuCategoryId}
              >
                <button
                  className={activeMenuButton}
                  onClick={this.onMenuCategoryChange}
                  type="button"
                  id={eachMenu.menuCategoryId}
                >
                  {eachMenu.menuCategory}
                </button>
              </li>
            )
          })}
        </ul>
        <ul className="dishes-list-container">
          {activeCategoryDishes.map(eachDish => {
            const isDishInCartItems = cartItems.find(
              eachItem => eachItem.dishId === eachDish.dishId,
            )

            const count = isDishInCartItems ? isDishInCartItems.count : 0

            return (
              <DishListItem
                dishDetails={eachDish}
                key={eachDish.dishId}
                onCountIncrement={this.onCountIncrement}
                onCountDecrement={this.onCountDecrement}
                count={count}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Home
