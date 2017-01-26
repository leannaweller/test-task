import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Container from './Container';
import * as utils from './utils';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      contacts:[],
      displayedContacts:[],
      geo:{
        lat: "-37.3159",
        lng: "81.1496"
      },
      filter:''
    }
    this.loadData=this.loadData.bind(this);
    this.filter=this.filter.bind(this);
    this.sortContacts=this.sortContacts.bind(this);
    this.addNewUser=this.addNewUser.bind(this);
  }
  sortContacts(order){
    console.log('SORT CONTACTS');
    let displayedContacts=this.state.displayedContacts;
    if(order>0){
      displayedContacts.sort((a,b)=>{
        return utils.compare(a,b);
      });
    }else{
      displayedContacts.sort((a,b)=>{
        return utils.compare(b,a);
      });
    }
    this.setState({displayedContacts:displayedContacts});
  }
  filter(filter){
    let {contacts}=this.state;
    console.log(`FILTER ${filter}`);
    this.setState({filter:filter});
    if(filter){
      let newContacts=utils.filterBy(filter,contacts);
      this.setState({displayedContacts:newContacts})
    }
  }
  addNewUser(data){
    console.log('ADD NEW USER')
    let contacts = this.state.contacts;
    data.id = contacts[contacts.length-1].id+1;
    let users;
    contacts.push(data);
    localStorage.getItem("users") ?
    users = JSON.parse(localStorage.getItem("users"))
    :
    users = []
    users.push(data);
    contacts.push()
    localStorage.setItem("users", JSON.stringify(users));
    this.setState({contacts:contacts,displayedContacts:contacts});
  }
  loadData(){
    let self=this;
    axios.get('https://jsonplaceholder.typicode.com/users').then(function(data){
    // console.log(data.data);
    let contacts = data.data
    if (localStorage.getItem("users")){
      let users = JSON.parse(localStorage.getItem("users"));
      contacts = contacts.concat(users);
      console.log(contacts);
    }
    if(self.state.contacts.length===0){
        self.setState({contacts:contacts,displayedContacts:contacts});
      }
    });
  }
  componentWillMount(){
    this.loadData();
    this.fetchData=setInterval(this.loadData,5000);
  }
  componentWillUnmount(){
    clearInterval(this.fetchData);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Contact List</h2>
        </div>
        <Container onAddNewUser={this.addNewUser}
        sortContacts={(order)=>{this.sortContacts(order)}}
        onFilterChange={(e)=>{this.filter(e.target.value)}} {...this.state}>
          {
            this.state.filter ? <h2>Result: {this.state.displayedContacts.length} items </h2> : <div></div>
          }
        </Container>
      </div>
    );
  }
}

export default App;
