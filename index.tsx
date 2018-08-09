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
      <div>
        <TrackUploader />
        <TrackList
          onSelectTrack={this.onSelectTrack}
        />
        <Player
          currentTrack={this.state.currentTrack}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
