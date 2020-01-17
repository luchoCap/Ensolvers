import React from 'react'
import { render } from 'react-dom';
import App from './App'

import { HashRouter as Router, Route } from 'react-router-dom'

class AppFin extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/home" component={App} />
                    </div>
                </Router>
            </div>

        );

    }
}

render(<AppFin />, document.getElementById('app')) 