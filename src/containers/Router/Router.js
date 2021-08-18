// Core
import React from 'react';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
// Pages
import About from '../../pages/About';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
// Styles
import Tab from '@material-ui/core/Tab';

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Link className='Menu-link' to='/'>
          <Tab label="Home" />
        </Link>     
        <Link className='Menu-link' to='/about'>
          <Tab label="About" />
        </Link>

        <Switch>
          <Route path={'/about'} component={About} />
          <Route exact path={'/'} component={Home} />
          <Route path={'/404'} component={NotFound} />
          <Redirect to={'/404'} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;