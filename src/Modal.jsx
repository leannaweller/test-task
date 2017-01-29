import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as utils from './utils'
export default class Modal extends React.Component {
  constructor(props){
    super(props);
    this.state={
      error:utils.error()
    }
  }
 renderTextFields = (item) => {
   const errorStyle={border:'1px solid tomato'}
   return <div className='text-field'>
     {
       Object.keys(item).map( (key) => {
         if (item.hasOwnProperty(key)){
           if(typeof item[key] !== 'object'){
             return(
               <div className='text-field'>
                 <label htmlFor={key}>{key}</label>
                 <input style={item[key] ? errorStyle : {}} type="text" ref={key}/>
                 <span className="error-text">{item[key]}</span>
               </div>
             );
           }
         }
       })
     }
   </div>
 }
 handleClose = () => {
   console.log('ERROR');
   console.log(utils.error());
   this.setState({error:utils.error()});
   this.props.onClose();
 }
 handleSubmit = () => {
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
        cname:this.refs.cname.value,
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
    let {error} = this.state
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
            {
              this.renderTextFields(error)
            }
            <h4>Address</h4>
            {
              this.renderTextFields(error.address)
            }
            <h4>Geo</h4>
            {
              this.renderTextFields(error.address.geo)
            }
            <h4>Company</h4>
            {
              this.renderTextFields(error.company)
            }
          </div>
        </Dialog>
    );
  }


}
