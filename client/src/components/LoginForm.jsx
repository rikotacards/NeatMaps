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
      username: null,
      processing: false,
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

    var email = this.state.email
    var password = this.state.password

    e.preventDefault()
    if(!email || !password){

      this.setState({
        successfulLogin:false,
      })
      return
    }
    //toggle on loading display
    this.setState({
      processing:true
    })

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
          authenticate: !this.state.authenticated,
          processing:false
        })
      }
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        successfulLogin: false,
        processing:false
      })
    })
  }
  render(){
    if(this.state.authenticate){
      return(
        <div className = 'app-wraper'>
          <div className = 'app-welcome'>Welcome {this.state.email}</div>
          <UploadForm/>
        </div>
      )
    } else {
    return(
        <div className='login-wrapper'>
          <div className='hero-title'> Welcome to Neat Maps</div>
          <form id='login' name='login' onSubmit={this.authenticate}>
            <div>
              <input placeholder='email' className='loginEmail loginInput' onChange={this.handleChange} name='email'
                type='text'></input>
            </div>
            <div>
              <input placeholder='password' className='passwordInput loginInput' onChange={this.handleChange}
                name='password' type='password'>
              </input>
            </div>
            <div className='login-processing'>
              {this.state.processing ? (
              'Logging in. Please wait.' ) : (null)}
            </div>
            <div className='loginStatus'>
              {this.state.successfulLogin ? (
              null ) : 'Incorrect username or password. Please try again.'}
            </div>
            <button className='loginBtn' type='submit'>
              Sign in
            </button>
          </form>
        </div>
      )
    }
  }
}
export default Login