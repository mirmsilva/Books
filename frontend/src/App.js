import React from 'react';
import './App.css';
import axios from 'axios';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      books: []
    };
  }
//  makeRequest = async () => {
//    const {getIdTokenClaims} = this.props.auth0;
//    let tokenClaims = await getIdTokenClaims();
//    const jwt = tokenClaims.__raw;
   
//    const config = {
//      headers:{"Authorization" : `Bearer ${jwt}`}
//    };

   //const serverResponse = await axios.get('http://localhost:3001/test-login', config)

   //console.log(serverResponse);

   onFormSubmit = async (e) => {
     e.preventDefault();
      let bookData = await axios.get(`http://localhost:3001/books?searchQuery=${e.target.query.value}`);
      console.log(bookData);
      this.setState({books: bookData.data.docs})
      console.log(this.state.books);
      
   }
   
 
  render(){
    console.log(this.props.auth0);
    const {user, isAuthenticated, isLoading} = this.props.auth0;
    const books = this.state.books;

   

    if(isLoading){
      return<h2> Loading...</h2>
    }
    else{
    
    return(
      <>
      <h1> Hello!</h1>
      {isAuthenticated ? 
      <LogoutButton/> : <LoginButton/>}
      <h3>{user.name}</h3> 

      <h1>Find Books By Author</h1>
      <form onSubmit={this.onFormSubmit}>
        <input id="query" />
        <input type="submit" value="search"/>
      </form>
       {/* {this.state.bookData.map(b => <p>{b.name}</p>)} */}
       {console.log(books)}
       <div>
      <ol>
          {
          books.map(b => (
            <p>{b.name}</p>
          ))
          }
      </ol>
    </div>
      </>
    )
    }
  }
}
export default withAuth0(App);
