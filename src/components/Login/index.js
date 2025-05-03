import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrMsg: false}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrMsg: true, errorMsg})
  }

  onLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showErrMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <form className="login-form" onSubmit={this.onLogin}>
          <label htmlFor="username" className="login-label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="login-input"
            onChange={this.onUsernameChange}
            value={username}
          />
          <label htmlFor="password" className="login-label">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            className="login-input"
            onChange={this.onPasswordChange}
            value={password}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrMsg && <p className="login-error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
