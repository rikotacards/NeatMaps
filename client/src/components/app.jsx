import React from 'react';
import UploadForm from './UploadForm.jsx'
import {BrowserRouter, Route, HashRouter} from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <BrowserRouter>
      <Route path='/home' component ={  UploadForm}/>
      </BrowserRouter>


    )
  }
}

export default App