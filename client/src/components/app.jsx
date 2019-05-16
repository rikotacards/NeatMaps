import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <p>upload your csv file</p>
        <form>
          <input type='file'></input>
          <button type = 'submit'>upload</button>
        </form>

      </div>
    )
  }
}

export default App