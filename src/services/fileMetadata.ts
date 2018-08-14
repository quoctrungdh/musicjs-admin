interface IMediaMetadata {
  duration: Number;
}

const fileMetadataService = {
  byAudio(file): Promise<IMediaMetadata> {
    return new Promise((resolve) => {
      const audioUrl = URL.createObjectURL(file);

      const audioEle = document.createElement('audio');
      audioEle.addEventListener('loadedmetadata', () => {
        resolve({
          duration: audioEle.duration
        })
      });

      audioEle.setAttribute('src', URL.createObjectURL(file))
    })
  }
}

export default fileMetadataService;