import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if(module.hot){
  module.hot.accept('./App',()=>{
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp/>,
      document.getElementById('root')
    );
  });
}
