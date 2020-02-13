import React, { Component } from 'react';

class EditJoke extends Component {
  state = {
    jokeInput: {
      setup: '',
      punchline: ''
    },
    cors: 'https://cors-anywhere.herokuapp.com/'
  };

  componentDidMount() {
    const { cors } = this.state;
    const { _id } = this.props.location;
    fetch(`${cors}${process.env.REACT_APP_API_URL}/${_id}`)
      .then(res => res.json())
      .then(joke => {
        this.setState({
          jokeInput: {
            setup: joke.setup,
            punchline: joke.punchline
          }
        });
      });
  }

  handleChange = e => {
    let jokeInput = { ...this.state.jokeInput };
    jokeInput[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ jokeInput });
  };

  handleEdit = event => {
    event.preventDefault();
    const { _id } = this.props.location;
    const { setup, punchline } = this.state.jokeInput;
    this.props.editJoke(_id, setup, punchline);
    window.location = '/';
  };

  render() {
    const { setup, punchline } = this.state.jokeInput;

    return (
      <div className="joke-wrap">
        <form onSubmit={this.handleEdit} autoComplete="off">
          <h2>Edit Joke</h2>
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
            <button type="submit">Edit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditJoke;
