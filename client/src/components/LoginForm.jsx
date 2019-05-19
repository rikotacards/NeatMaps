import React from 'react';
import axios from 'axios';
import UploadForm from './UploadForm.jsx'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      authenticated: false,
      email: null,
      password: null,
      successfulLogin: true,
      username: null
    }
    this.authenticate = this.authenticate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    var change = {}
    change[e.target.name] = e.target.value
    this.setState(
      change
    )
  }

  authenticate(e){
    console.log('clicked')
    var email = this.state.email
    var password = this.state.password

    e.preventDefault()

    if(!email || !password){
      console.log('hit')
      this.setState({
        successfulLogin:false
      })
      return
    }

    axios({
      url:'/authenticate',
      method:'post',
      data:{
        email: email,
        password: password
      }
    })
    .then((res) => {
      if(!res){
        this.setState({
          successfulLogin: false
        })
      } else {
        this.setState({
          authenticate: !this.state.authenticated
        })
      }
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        successfulLogin: false
      })
    })
  }


  render(){
    if(this.state.authenticate){
      return(
        <div>
          Welcome {this.state.email}
          <UploadForm/>
        </div>
      )
    } else {
    return(
        <div>
          <form id = 'login' name = 'login' onSubmit = {this.authenticate}>
            <div>
              <input onChange = {this.handleChange} name = 'email'type = 'text'></input>
            </div>
            <div>
              <input className = 'passwordInput' onChange = {this.handleChange} name = 'password' type = 'password'>
              </input>
            </div>
            <div className = 'loginStatus'>
              {this.state.successfulLogin ? (
             null ) : 'Incorrect username or password. Please try again.'}
            </div>
            <button className = 'loginBtn' type = 'submit'>
              Sign in
            </button>
          </form>
        </div>
      )
    }
  }
}
export default Login