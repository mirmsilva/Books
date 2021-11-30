import React from 'react';
import './App.css';
import axios from 'axios';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component{
 makeRequest = async () => {
   const {getIdTokenClaims} = this.props.auth0;
   let tokenClaims = await getIdTokenClaims();
   const jwt = tokenClaims.__raw;
   
   const config = {
     headers:{"Authorization" : `Bearer ${jwt}`}
   };

   const serverResponse = await axios.get('http://localhost:3001/test-login', config)

   console.log(serverResponse);
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
      {isAuthenticated ? 
      <LogoutButton/> : <LoginButton/>}
      {user ? <> 
      <h3>{user.name}</h3> 
      <button onClick={this.makeRequest}>Make request to server</button> </> : ''}
      </> 
    )
    }
  }
}
export default withAuth0(App);
