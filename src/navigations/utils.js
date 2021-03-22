import * as React from 'react';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export default {
  navigate,
  goBack,
};
