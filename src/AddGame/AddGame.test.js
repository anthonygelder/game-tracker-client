import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import AddGame from './AddGame';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const push = function() {return ''}
  const routeProps = {
      history: {
        push
      }
  }
  ReactDOM.render(<BrowserRouter>
    <AddGame routeProps={routeProps} />
  </BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});


