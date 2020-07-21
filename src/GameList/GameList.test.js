import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import GameList from './GameList';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const push = function() {return ''}
  const routeProps = {
      history: {
        push
      }
  }
  ReactDOM.render(<BrowserRouter>
    <GameList routeProps={routeProps} />
  </BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});


