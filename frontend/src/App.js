import React from 'react';
import './App.css';
import axios from 'axios';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      plant:''
    };
  }
  onButtonClick = async(e) => {
    //make a request to our server
    let plant = await axios.get('http://localhost:3001/flower')
    //save that info into the state
    console.log(plant);
    this.setState({
      plant:plant.data
    })
  }
  render(){
    console.log(this.props.auth0);
    const {user, isAuthenticated, isLoading} = this.props.auth0;

    if(isLoading){
      return<h2> Loading...</h2>
    }
    else{
    
    return(
      <>
      <h1> Hello!</h1>
      <button onClick={this.onButtonClick}> Get the data</button>
      <h2>{this.state.plant}</h2>
      {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
      {user ? <h3>{user.name}</h3> : ''}
      </>
    )
    }
  }
}
export default withAuth0(App);
