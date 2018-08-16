import * as React from 'react';

import trackRepository from '../repositories/trackRepository';

function timeConverter(timeInSec) {
  const minutes = Math.floor(timeInSec / 60);
  const seconds = Math.floor(timeInSec %  60);
  return `${minutes}:${seconds}`
}

export default class TrackList extends React.Component {
  private unsub: Function;

  state = {
    tracks: []
  }

  async componentDidMount() {
    this.unsub = trackRepository.subscribe(this.handleListChange)
  }

  componentWillUnmount() {
    this.unsub()
  }

  handleListChange = tracks => {
    this.setState({ tracks });
  }

  renderTrackItem = (track) => {
    return (
      <div
        key={track.title}
        className="card"
        onClick={this.props.onSelectTrack(track)}
      >
        <div className="card-content">
          <div className="media">
            <div className="media-left">
            <figure className="image is-64x64">
              <img className="is-rounded" src="https://bulma.io/images/placeholders/64x64.png" alt="album cover"/>
            </figure>
            </div>
            <div className="media-content">
              <p className="is-capitalized">{track.title}</p>
              <p className="">{track.artist}</p>
              <p className="has-text-grey">{timeConverter(track.duration)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="track-list">
          {this.state.tracks.map(this.renderTrackItem)}
        </div>
      </div>
    )
  }
}

// TODO: handle empty list + error