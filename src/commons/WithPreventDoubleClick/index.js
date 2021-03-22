import React from 'react';
import debounce from 'lodash.debounce';

// https://stackoverflow.com/questions/47102946/prevent-double-tap-in-react-native
const withPreventDoubleClick = (WrappedComponent) => {
  class PreventDoubleClick extends React.PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    onPress = debounce(this.debouncedOnPress, 300, {
      leading: true,
      trailing: false,
    });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }
  return PreventDoubleClick;
};

export default withPreventDoubleClick;
