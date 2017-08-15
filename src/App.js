import React, {Component} from 'react';
import './App.css';

const imagesDir = require.context('./img', false, /\.jpg$/);

class App extends Component {
  state = {
    images: [],
    modalImg: null,
  };

  componentDidMount() {
    this.setState({
      images: imagesDir.keys().map((src, i) => ({
        id: i,
        src: imagesDir(src),
      })),
    });
  }

  showImageModal = imgId => this.setState({modalImg: imgId});

  hideImageModal = () => this.setState({modalImg: null});

  render() {
    const {modalImg, images} = this.state;
    const modalImage = modalImg !== null && images[modalImg];

    return (
      <div className="App">
        <h1 className="App__title">React Gallery</h1>
        <div className="Gallery">
          {this.state.images.map(({src, id}) =>
            <img
              key={`img_${id}`}
              className="Gallery__image"
              src={src}
              alt={`img_${id}`}
              onClick={() => this.showImageModal(id)}
            />
          )}
        </div>
        {modalImage &&
          <div className="Modal__backdrop">
            <img
              className="Modal__image"
              alt={modalImage.id}
              src={modalImage.src}
            />
            <div className="Modal__x" onClick={this.hideImageModal}>
              &#x2716;
            </div>
          </div>}
      </div>
    );
  }
}

export default App;
