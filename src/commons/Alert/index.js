import React from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet } from 'react-native';

import Text from '../Text';

import { Colors } from '../../configs';
import TextButton from '../TextButton';

class Alert extends React.Component {
  static _ref = null;

  static setRef(ref = {}) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }

  state = {
    title: '',
    description: '',
    buttons: [],
    show: false,
    styleButtons: [] || {},
  };

  static alert = (title, description, buttons, styleButtons) => {
    this._ref.setState({
      title,
      description,
      buttons,
      show: true,
      styleButtons,
    });
  };

  renderContent = () => {
    const { description, title } = this.state;
    return (
      <>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.descriptionWrap}>
          {React.isValidElement(description) ? (
            description
          ) : (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      </>
    );
  };

  renderButtons = () => {
    const justifyContent =
      this.state.buttons.length === 1 ? 'center' : 'space-between';
    return (
      <View
        key={this.state.title}
        style={[
          styles.flexRow,
          {
            justifyContent: justifyContent,
          },
          this.state.styleButtons,
        ]}
      >
        {this.state.buttons.map((item, index) => {
          return (
            <TextButton
              key={`item_${index}`}
              primary={item.primary}
              title={item.label}
              onPress={item.onPress}
              wrapStyle={item.style}
            />
          );
        })}
      </View>
    );
  };

  static hideModal = () => {
    this._ref.setState({ show: false });
  };

  static showModal = () => {
    this._ref.setState({ show: true });
  };

  render() {
    const { buttons, show } = this.state;
    return (
      <Modal animationIn={'zoomIn'} animationOut={'zoomOut'} isVisible={show}>
        <View style={[styles.wrap, styles.contentPadding]}>
          {this.renderContent()}
        </View>
        <View style={[styles.wrap, styles.buttonsPadding]}>
          {!!buttons?.length && this.renderButtons()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.Primary,
  },
  descriptionWrap: {
    minHeight: 78,
    paddingVertical: 10,
  },
  description: {
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  contentPadding: {
    paddingBottom: 0,
  },
  buttonsPadding: {
    paddingTop: 0,
    alignItems: 'stretch',
  },
});

export default Alert;
