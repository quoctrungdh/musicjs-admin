import * as React from 'react';

import trackRepository from '../repositories/trackRepository';

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

  handleListChange = async(tracks) => {
    this.setState({ tracks });
  }

  renderTrackItem = (track) => {
    return (
      <div key={track.title} onClick={this.props.onSelectTrack(track)}>
        {track.title}
      </div>
    )
  }

  render() {
    return this.state.tracks.map(this.renderTrackItem)
  }
}

// TODO: handle empty list + error