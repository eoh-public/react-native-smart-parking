import * as React from 'react';
import { CardStyleInterpolators } from '@react-navigation/stack';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default {
  navigate,
  goBack,
  screenOptions,
};
