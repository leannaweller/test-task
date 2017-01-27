import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Container';
import * as utils from './utils';
import config from './config'
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
  }
  addNewUser(data){
    console.log('ADD NEW USER');
    data.id = contacts[contacts.length-1].id+1;
    let contacts = this.state.contacts;
    contacts.push(data);
    utils.saveToLocalStorage(data,"users");
    this.setState({contacts:contacts});
  }
  loadData(){
    if(this.state.contacts.length===0){
      let data1 = utils.getDataFromLocalStorage("users");
      utils.getDataFromURL(config.url).then(data=>{
          data = data.data;
          let contacts = utils.mergeArrays(data,data1);
          this.setState({contacts:contacts});
      },error=>{
        this.setState({contacts:data1});
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
  render() {
    let {contacts,filter,order}=this.state;
    let displayed = utils.sortAndFilter(contacts,filter,order) || [];
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
