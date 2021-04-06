import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ListContainer} from './containers';

const Routes = props => (
    <React.Fragment>

    <Router basename="/">
        <Switch>
            <Route exact path="/" render ={()=> <ListContainer {...props} />}/>
        </Switch>

    </Router>
    </React.Fragment>

);

export default Routes;