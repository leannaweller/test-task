import React, { Component } from 'react';
import * as utils from './utils';

export default class Contact extends Component{
  constructor(props){
    super(props);
    this.state={
      showPersonalInfo:false,
      showAddress:false,
      showCompanyInfo:false
    }
  }
  render(){
    const {contact} = this.props;
    return(
      <tr>
        <td onClick={()=>{this.setState({showPersonalInfo:!this.state.showPersonalInfo})}}>
          <div className='flex-container'>
            <i className={this.state.showPersonalInfo ? 'ion-minus-circled' : 'ion-plus-circled'}></i>
            {contact.name}
          </div>
          <div className='hidden-info' style={this.state.showPersonalInfo ? {display:'block'}:{display:'none'}}>
            <div>{contact.username}</div>
            <div>{contact.phone}</div>
            <div>{contact.website}</div>
          </div>
        </td>
        <td onClick={()=>{this.setState({showAddress:!this.state.showAddress})}}>
          <div className='flex-container'>
            <i className={this.state.showAddress ? 'ion-minus-circled' : 'ion-plus-circled'}></i>
            <div>{contact.address.street}</div>
          </div>
          <div className='hidden-info' style={this.state.showAddress ? {display:'block'}:{display:'none'}}>
            <div>{contact.address.suite}</div>
            <div>{contact.address.city}</div>
            <div>{contact.address.zipcode}</div>
            <div>{'Distance: '+utils.countDistance(this.props.geo,contact.address.geo).toFixed(2)+' km'}</div>
          </div>
        </td>
        <td onClick={()=>{this.setState({showCompanyInfo:!this.state.showCompanyInfo})}}>
          <div className='flex-container'>
            <i className={this.state.showCompanyInfo ? 'ion-minus-circled' : 'ion-plus-circled'}></i>
            <div>{contact.company.name}</div>
          </div>
          <div className='hidden-info' style={this.state.showCompanyInfo ? {display:'block'}:{display:'none'}}>
            <div>{contact.company.catchPhrase}</div>
            <div>{contact.company.bs}</div>
          </div>
        </td>
      </tr>
    );
  }





}
