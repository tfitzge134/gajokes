import React, { Component } from 'react';

class AddJokes extends Component {
  state = {
    jokeInput: {
      setup: '',
      punchline: ''
    }
  };

  handleChange = e => {
    let jokeInput = { ...this.state.jokeInput };
    jokeInput[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ jokeInput });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { setup, punchline } = this.state.jokeInput;
    this.props.addJoke(setup, punchline);
    window.location = '/';
  };

  render() {
    const { setup, punchline } = this.state.jokeInput;
    return (
      <div className="joke-wrap">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <h2>Add Joke</h2>
          <div>
            <label htmlFor="setup">Setup: </label>
            <input
              type="text"
              name="setup"
              value={setup}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="punchline"> Punchline: </label>
            <input
              type="text"
              name="punchline"
              value={punchline}
              onChange={this.handleChange}
            />
          </div>
          <div className="submit">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddJokes;
