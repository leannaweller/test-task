import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Container from './Container';
import * as utils from './utils';
import Immutable from 'immutable';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      contacts:[],
      geo:{
        lat: "-37.3159",
        lng: "81.1496"
      },
      filter:'',
      order:''
    }
    this.loadData=this.loadData.bind(this);
    this.addNewUser=this.addNewUser.bind(this);
    this.sortAndFilter=this.sortAndFilter.bind(this);
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
    this.setState({contacts:contacts});
  }
  loadData(){
    let self=this;
    if(self.state.contacts.length===0){
      axios.get('https://jsonplaceholder.typicode.com/users').then(function(data){
        let contacts = data.data
        if (localStorage.getItem("users")){
          let users = JSON.parse(localStorage.getItem("users"));
          contacts = contacts.concat(users);
          console.log(contacts);
        }
        self.setState({contacts:contacts});
      });
    }

  }
  componentWillMount(){
    this.loadData();
    this.fetchData=setInterval(this.loadData,5000);
  }
  componentWillUnmount(){
    clearInterval(this.fetchData);
  }
  sortAndFilter(){
    let newContacts=this.state.contacts;
    if(this.state.filter){
      console.log(`FILTER ${this.state.filter}`);
      newContacts=utils.filterBy(this.state.filter,newContacts);
    }
    console.log(newContacts)
    if(this.state.order){
      console.log('SORT CONTACTS');
      if(this.state.order>0){
        newContacts.sort((a,b)=>{
          return utils.compare(a,b);
        });
      }else{
        newContacts.sort((a,b)=>{
          return utils.compare(b,a);
        });
      }
    }
    console.log(newContacts)
    return newContacts;
  }
  render() {
    let displayed = this.sortAndFilter() || [];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Contact List</h2>
        </div>
        <Container onAddNewUser={this.addNewUser}
        sortContacts={(order)=>{this.setState({order:order})}}
        onFilterChange={(e)=>{this.setState({filter:e.target.value})}}
        geo={this.state.geo}
        displayed={displayed}
        contacts={this.state.contacts}
        >
          {
            this.state.filter ? <h2>Result: {displayed.length} items </h2> : <div></div>
          }
        </Container>
      </div>
    );
  }
}

export default App;
