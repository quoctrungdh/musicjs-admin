import * as React from 'react';
import { render } from 'react-dom';

export default class Player extends React.Component {
  private audio;

  componentDidUpdate(prevProps) {
    if(prevProps.currentTrack !== this.props.currentTrack) {
      this.audio.pause();
      this.audio.load();
      this.audio.play();
    }
  }

  render() {
    const { currentTrack } = this.props;

    if(!currentTrack) {
      return <div>Select a song to play</div>
    }

    return (
      <div>
        <p>{currentTrack.titles}</p>
        <audio controls ref={ref => this.audio = ref}>
          <source src={currentTrack.downloadUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    )
  }
}