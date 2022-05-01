import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Page2/Home';
import { Crypto } from './pages/Page2/Crypto';
import { Ethscan } from './pages/Page2/Ethscan';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/crypto" exact component={Crypto} />
      <Route path="/eth-scan" exact component={Ethscan} />
    </Switch>
  </BrowserRouter>
);

export default App;