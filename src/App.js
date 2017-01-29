import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Container';
import * as utils from './utils';
import config from './config';
import Immutable from 'immutable';
import Notification from './Notification';
import Snackbar from 'material-ui/Snackbar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
      order:'',
      showLoadNotification:false
    }
  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  shouldComponentUpdate(nextProps,nextState){
    let{contacts,filter,order,showLoadNotification} = this.state;
    if(nextState.contacts===contacts && nextState.filter===filter
      && nextState.order ===order && nextState.showLoadNotification===showLoadNotification){
      return false;
    }
    return true;
  }
  addNewUser = (data) => {
    console.log('ADD NEW USER');
    data.id = contacts[contacts.length-1].id+1;
    let contacts = this.state.contacts;
    contacts=contacts.push(data);
    utils.saveToLocalStorage(data,"users");
    this.setState({contacts:contacts});
  }
  loadData = () => {
    let data1 = utils.getDataFromLocalStorage("users");
    utils.getDataFromURL(config.url).then(data=>{
        data = data.data;
        let contacts = utils.mergeArrays(data,data1);
        this.setState({contacts:Immutable.List(contacts),showLoadNotification:true});
    },error=>{
      this.setState({contacts:Immutable.List(data1),showLoadNotification:true});
    });
  }
  componentWillMount(){
    this.loadData();
    // this.fetchData=setInterval(this.loadData,5000);
  }
  componentWillUnmount(){
    // clearInterval(this.fetchData);
  }
  render() {
    let {contacts,filter,order}=this.state;
    let displayed = utils.sortAndFilter(contacts,filter,order) || [];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Contact List App</h2>
        </div>
        <Container onAddNewUser={this.addNewUser}
        sortContacts={(order)=>{this.setState({order:order})}}
        onFilterChange={(e)=>{this.setState({filter:e.target.value})}}
        geo={this.state.geo}
        displayed={Immutable.List(displayed)}
        contacts={this.state.contacts}
        onDownload={()=>{this.loadData()}}
        >
          {
            this.state.filter ? <h2>Result: {displayed.length} items </h2> : <div></div>
          }
        </Container>
      </div>
    );
  }
}
App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
export default App;
