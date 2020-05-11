import React from 'react'
import Root from './Root'
import { Route, Switch } from 'react-router-dom'
import Detail from './components/main/Detail.component'
import axios from 'axios'
import Navbar from './components/utils/navbar.component'

export default class App extends React.Component {
  async axiosGetRequest(url) {
    return await axios.get(url)
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="col-md-6 offset-md-3">
          <Switch>
            <Route
              exact
              path="/"
              render={(routeProps) => (
                <Root
                  axiosGetRequest={this.axiosGetRequest.bind(this)}
                  routeProps={routeProps}
                />
              )}
            />
            <Route
              exact
              path="/detail/:id"
              render={(routeProps) => (
                <Detail
                  axiosGetRequest={this.axiosGetRequest.bind(this)}
                  routeProps={routeProps}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    )
  }
}
