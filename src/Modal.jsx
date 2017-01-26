import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import * as utils from './utils'
export default class Modal extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.state={
      error:utils.error()
    }
  }
 getChildContext() {
   return { muiTheme: getMuiTheme(baseTheme) };
 }
 handleClose(){
   console.log('ERROR');
   console.log(utils.error());
   this.setState({error:utils.error()});
   this.props.onClose();
 }
 handleSubmit(){
    const newUser={
      name:this.refs.name.value,
      username:this.refs.username.value,
      email:this.refs.email.value,
      address:{
        street:this.refs.street.value,
        suite:this.refs.suite.value,
        city:this.refs.city.value,
        zipcode:this.refs.zipcode.value,
        geo:{
          lat:this.refs.lat.value,
          lng:this.refs.lng.value
        }
      },
      phone:this.refs.phone.value,
      website:this.refs.website.value,
      company:{
        name:this.refs.cname.value,
        catchPhrase:this.refs.catchPhrase.value,
        bs:this.refs.bs.value
      }
    }
    const error=utils.validate(newUser);
    if(!error){
      this.setState({error:utils.error()});
      console.log('NEW USER');
      console.log(newUser);
      this.props.onSubmit(newUser);
    }else{
      this.setState({error:error});
    }
 }
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        // keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    const errorStyle={border:'1px solid tomato'}
    return(
      <Dialog
          title="Add new employee"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
           autoScrollBodyContent={true}
        >
          <div style={{padding:'20px',display:'table'}}>
            <h4>Personal info</h4>
            <div className='text-field'>
              <label htmlFor="name">Name</label>
              <input style={this.state.error.name ? errorStyle : {}} type="text" ref="name"/>
              <span className="error-text">{this.state.error.name}</span>
            </div>
            <div className='text-field'>
              <label htmlFor="username">User name</label>
              <input style={this.state.error.username ? errorStyle : {}} type="text" ref="username"/>
              <span className="error-text">{this.state.error.username}</span>
            </div>
            <div className='text-field'>
              <label htmlFor="email">Email</label>
              <input style={this.state.error.email ? errorStyle : {}} type="text" ref="email"/>
              <span className="error-text">{this.state.error.email}</span>
            </div>
            <div className='text-field'>
              <label htmlFor="phone">Phone</label>
              <input style={this.state.error.phone ? errorStyle : {}} type="text" ref="phone"/>
              <span className="error-text">{this.state.error.phone}</span>
            </div>
            <div className='text-field'>
              <label htmlFor="website">Website</label>
              <input style={this.state.error.website ? errorStyle : {}} type="text" ref="website"/>
              <span className="error-text">{this.state.error.website}</span>
            </div>
            <h4>Address</h4>
              <div className='text-field'>
                <label htmlFor="street">Street</label>
                <input style={this.state.error.address.street ? errorStyle : {}} type="text" ref="street"/>
                <span className="error-text">{this.state.error.address.street}</span>
              </div>
              <div className='text-field'>
                <label htmlFor="suite">Suite</label>
                <input style={this.state.error.address.suite ? errorStyle : {}} type="text" ref="suite"/>
                <span className="error-text">{this.state.error.address.suite}</span>
              </div>
              <div className='text-field'>
                <label htmlFor="city">City</label>
                <input style={this.state.error.address.city ? errorStyle : {}} type="text" ref="city"/>
                <span className="error-text">{this.state.error.address.city}</span>
              </div>
              <div className='text-field'>
                <label htmlFor="zipcode">Zipcode</label>
                <input style={this.state.error.address.zipcode ? errorStyle : {}} type="text" ref="zipcode"/>
                <span className="error-text">{this.state.error.address.zipcode}</span>
              </div>
              <h4>Geo</h4>
              <div className='text-field'>
                <label htmlFor="lat">Lat</label>
                <input style={this.state.error.address.geo.lat ? errorStyle : {}} type="text" ref="lat"/>
                <span className="error-text">{this.state.error.address.geo.lat}</span>
              </div>
              <div className='text-field'>
                <label htmlFor="lng">Lng</label>
                <input style={this.state.error.address.geo.lng ? errorStyle : {}} type="text" ref="lng"/>
                <span className="error-text">{this.state.error.address.geo.lng}</span>
              </div>
              <h4>Company</h4>
                <div className='text-field'>
                  <label htmlFor="name">Name</label>
                  <input style={this.state.error.company.name ? errorStyle : {}} type="text" ref="cname"/>
                  <span className="error-text">{this.state.error.company.name}</span>
                </div>
                <div className='text-field' >
                  <label htmlFor="catchphrase">Catch Phrase</label>
                  <input style={this.state.error.company.catchPhrase ? errorStyle : {}} type="text" ref="catchPhrase"/>
                  <span className="error-text">{this.state.error.company.catchPhrase}</span>
                </div>
                <div className='text-field'>
                  <label htmlFor="catchphrase">BS</label>
                  <input style={this.state.error.company.bs ? errorStyle : {}} type="text" ref="bs"/>
                  <span className="error-text">{this.state.error.company.bs}</span>
                </div>
          </div>
        </Dialog>
    );
  }


}
Modal.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
