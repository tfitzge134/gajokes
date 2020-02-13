import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import JokeList from './components/JokeList.js';
import AddJokes from './components/AddJokes.js';
import EditJoke from './components/EditJoke.js';

class App extends Component {
  state = {
    jokes: [],
    cors: 'https://cors-anywhere.herokuapp.com/'
  };

  componentDidMount() {
    this.getJokes();
  }

  getJokes = () => {
    const { cors } = this.state;
    fetch(`${cors}${process.env.REACT_APP_API_URL}`)
      .then(res => res.json())
      .then(jokes => {
        this.setState({ jokes });
      });
  };

  addJoke = (setup, punchline) => {
    const { cors } = this.state;
    fetch(`${cors}${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        setup,
        punchline
      })
    })
      .then(res => res.json())
      .then(data => console.log('joke added successfully', data));
  };

  editJoke = (_id, setup, punchline) => {
    const { cors } = this.state;
    fetch(`${cors}${process.env.REACT_APP_API_URL}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        setup,
        punchline
      })
    })
      .then(res => res.json())
      .then(data => console.log('Joke edited successfully', data));
  };

  deleteJoke = _id => {
    const { cors } = this.state;
    fetch(`${cors}${process.env.REACT_APP_API_URL}/${_id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log('Joke deleted successfully');
        window.location = '/';
      });
  };

  render() {
    const { jokes } = this.state;
    return (
      <React.Fragment>
        <div className="app">
          <div className="title">
            <h1>Ga Jokes</h1>
            <Link to="/add-joke">Add Joke</Link>
          </div>
          <Switch>
            <Route
              path="/edit-joke/:id"
              component={props => <EditJoke editJoke={this.editJoke} {...props} />}
            />
            <Route
              path="/add-joke"
              component={() => <AddJokes addJoke={this.addJoke} />}
            />
            <Route
              path="/"
              component={() => (
                <JokeList jokes={jokes} deleteJoke={this.deleteJoke} />
              )}
              exact
            />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
