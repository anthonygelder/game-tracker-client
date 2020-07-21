import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Game from './Game';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const game = {
      status: 'status',
      released: '100000'
  }
  ReactDOM.render(<BrowserRouter>
    <Game game={game}/>
  </BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});


