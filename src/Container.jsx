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
    this.sort=this.sort.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(data){
    this.props.onAddNewUser(data);
  }
  sort(order){
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
              <span>Sort:</span>
              <i className={this.state.arrowUpClass} onClick={()=>{this.sort(1)}}></i>
              <i className={this.state.arrowDownClass} onClick={()=>{this.sort(-1)}}></i>
            </div>
          <Modal onSubmit={this.handleSubmit} onClose={()=>{this.setState({open:false})}} open={this.state.open}/>
        </div>
        <div>
          {this.props.children}
        </div>
        <Contactlist {...this.props}/>
      </div>
    );
  }
}
 export default LoaderHOC(Container);
