import React,{Component} from 'react';
import Contactlist from './Contactlist.jsx';
import LoaderHOC from './LoaderHOC';
import Modal from './Modal'
class Container extends Component {
  constructor(props){
    super(props);
    this.state={
      open:false,
      arrowUpClass:'ion-arrow-up-c',
      arrowDownClass:'ion-arrow-down-c'
    }
  }
  shouldComponentUpdate(nextProps,nextState){
    let {open,arrowUpClass,arrowDownClass} = this.state;
    let {geo,displayed,contacts} = this.props;
    if(nextState.open === open && nextState.arrowUpClass === arrowUpClass &&
      nextState.arrowDownClass === arrowDownClass && nextProps.geo === geo && nextProps.displayed === displayed &&
      nextProps.contacts === contacts){
        return false;
      }
      return true;
  }
  handleSubmit = (data) => {
    console.log('ADD NEW USER');
    this.setState({open:false})
    this.props.onAddNewUser(data);
  }
  setSortOrder = (order) => {
    if(order>0){
      this.setState({arrowUpClass:'ion-arrow-up-c selected',arrowDownClass:'ion-arrow-down-c'});
      this.props.sortContacts(1)
    }else{
      this.setState({arrowUpClass:'ion-arrow-up-c',arrowDownClass:'ion-arrow-down-c selected'});
      this.props.sortContacts(-1)
    }
  }
  render(){
    return (
      <div className='main'>
        <div style={{'display':'flex'}} className='find'>
          <input type="text" onChange={(event)=>{this.props.onFilterChange(event)}}/>
          <button className='button' onClick={()=>{this.setState({open:true})}}><i className='ion-plus'></i></button>
            <div className='sort-group'>
              <span>Sort by name:</span>
              <i className={this.state.arrowUpClass} onClick={()=>{this.setSortOrder(1)}}></i>
              <i className={this.state.arrowDownClass} onClick={()=>{this.setSortOrder(-1)}}></i>
            </div>
          <Modal onSubmit={this.handleSubmit} onClose={()=>{this.setState({open:false})}} open={this.state.open}/>
        </div>
        <div>
          {this.props.children}
        </div>
        <Contactlist
        displayed = {this.props.displayed}
        geo={this.props.geo}/>
      </div>
    );
  }
}
 export default LoaderHOC(Container);
