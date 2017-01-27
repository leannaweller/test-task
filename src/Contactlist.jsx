import React, { Component } from 'react';
import Contact from './Contact'

class Contactlist extends Component {
  render() {
    return (
      <table className="contactlist">
        <tr>
         <th><h3>Personal info:</h3></th>
         <th><h3>Adress:</h3></th>
         <th><h3>Company:</h3></th>
       </tr>
        {
          this.props.displayed.map((contact)=>{
            return <Contact geo={this.props.geo} contact={contact}/>
          })
        }
      </table>
    );
  }
}

export default Contactlist;
