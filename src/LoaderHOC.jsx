import React,{Component} from 'react';

const LoaderHOC = (WrappedComponent) =>{
  return class LoaderHOC extends Component {
    render(){
      return this.props.contacts.length===0 ? <div className="loader"></div> : <WrappedComponent {...this.props}/>
    }
  }
}
 export default LoaderHOC;
