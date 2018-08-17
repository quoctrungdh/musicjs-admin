import * as React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';

import { ModalProvider } from './src/components/Modal';
import TrackList from './src/components/TrackList';
import Player from './src/components/Player';
import TrackTable from './src/components/TrackTable';

class MusicJS extends React.Component {
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

function MusicAdmin() {
  return (
    <ModalProvider>
      <div className="p-6">
        <TrackTable />
      </div>
    </ModalProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Route exact path="/" component={MusicJS} />
        <Route path="/admin" component={MusicAdmin} />
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
