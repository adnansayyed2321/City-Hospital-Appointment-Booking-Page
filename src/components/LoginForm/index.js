import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    isLoginSuccess: false,
    PatientName: '',
    PatientPassword: '',
    error: false,
  }

  onName = event => {
    this.setState({error: false})
    this.setState({PatientName: event.target.value})
  }

  onPassword = event => {
    this.setState({error: false})
    this.setState({PatientPassword: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {PatientName, PatientPassword} = this.state

    if (PatientName === 'Sunita' && PatientPassword === 'sunita@123') {
      this.setState({error: false})
      this.setState({isLoginSuccess: true})
      const {history} = this.props
      const jwtToken = 9970633456
      Cookies.set('jwt_token', jwtToken, {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    } else {
      this.setState({error: true})
    }
  }

  render() {
    const {isLoginSuccess, error} = this.state
    console.log(isLoginSuccess)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <h1 className="hospital-name">City Hospital</h1>
        <form className="container" onSubmit={this.onSubmitForm}>
          <label htmlFor="name" className="label-name">
            Name
          </label>
          <input
            type="text"
            id="name"
            onChange={this.onName}
            className="input-bar"
          />
          <label htmlFor="password" className="label-name">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={this.onPassword}
            className="input-bar"
          />
          {error && (
            <p className="error-messsage">* name and password is incorrect</p>
          )}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
