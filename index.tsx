import * as React from 'react';
import ReactDOM from "react-dom";

import TrackUploader from './src/components/TrackUploader';
import TrackList from './src/components/TrackList';
import Player from './src/components/Player';

class App extends React.Component {
  state = {
    currentTrack: null
  }

  onSelectTrack = track => e => {
    this.setState({ currentTrack: track })
  }

  render() {
    return (
      <div className="container">
        <div className="navbar is-fixed-top has-shadow">
          <div className="is-pulled-right">
            <button className="button is-primary">Add</button>
          </div>
        </div>
        <TrackUploader />
        <TrackList
          onSelectTrack={this.onSelectTrack}
        />
        <div className="navbar is-fixed-bottom has-shadow is-hv-align">
          <Player
            currentTrack={this.state.currentTrack}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
