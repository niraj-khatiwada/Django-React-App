import React from 'react'
import Root from './Root'
import { Route, Switch } from 'react-router-dom'
import Detail from './components/main/Detail.component'
import axios from 'axios'

export default class App extends React.Component {
  async axiosGetRequest(url) {
    return await axios.get(url)
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center my-4">Django React App</h1>
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
    )
  }
}
