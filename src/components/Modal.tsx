import * as React from 'react';

const ModalContext = React.createContext();
export const ModalConsumer = ModalContext.Consumer;

const initialState = {
  type: null,
  props: null
}

export class ModalProvider extends React.Component {
  showModal = (type, props = {}) => {
    this.setState({
      type,
      props
    })
  }

  hideModal = () => {
    this.setState({
      ...initialState
    })
  }

  state = {
    ...initialState,
    showModal: this.showModal,
    hideModal: this.hideModal
  }

  render() {
    const ModalContent = this.state.type;
    return (
      <ModalContext.Provider value={this.state}>
        {this.props.children}
        {ModalContent
        ? (
          <div
            className="fixed pin flex items-center justify-center"
            style={{ backgroundColor: 'rgba(61, 72, 82, 0.5)' }}
            onClick={(e) => {
              if(e.currentTarget === e.target) {
                this.hideModal()
              }
            }}
          >
            <div className="flex-1 bg-white p-6 m-6 rounded overflow-y-scroll" style={{ maxHeight: '80%' }}>
              <ModalContent modalControl={this.state} />
            </div>
          </div>
        )
        : null}
      </ModalContext.Provider>
    )
  }
}