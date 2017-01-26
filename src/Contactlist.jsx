import React, { Component } from 'react';
import * as utils from './utils';
import randomAvatar from 'random-avatar';

class Contactlist extends Component {
  render() {
    const avatar=randomAvatar({extension: 'jpg'});
    return (
      <div className='contactlist'>
        {
          this.props.displayedContacts.map((contact)=>{
            return <div className='contact' key={contact.id}>
              <div className='contact-icon'>
                <img src={avatar} alt=""/>
              </div>
              <div className="flex-container">
                <div>
                  <h3>Personal info:</h3>
                  <div>{contact.name}</div>
                  <div>{contact.username}</div>
                  <div>{contact.phone}</div>
                  <div>{contact.website}</div>
                </div>
                <div>
                  <h3>Adress:</h3>
                  <div>{contact.address.street}</div>
                  <div>{contact.address.suite}</div>
                  <div>{contact.address.city}</div>
                  <div>{contact.address.zipcode}</div>
                  <div>{'Distance: '+utils.countDistance(this.props.geo,contact.address.geo).toFixed(2)+' km'}</div>
                </div>
                <div>
                  <h3>Company:</h3>
                  <div>{contact.company.name}</div>
                  <div>{contact.company.catchPhrase}</div>
                  <div>{contact.company.bs}</div>
                </div>
              </div>
            </div>
          })
        }
      </div>
    );
  }
}

export default Contactlist;
