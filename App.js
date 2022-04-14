import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Animated, {
  useEvent,
  useSharedValue,
  useAnimatedStyle,
  useHandler,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const startTingPosition = 100;

const TabComponent = props => {
  const shouldHide = useSharedValue(false);

  const onScrollHandler = useAnimatedGestureHandler({
    onStart: () => {
      shouldHide.value = true;
    },
    onEnd: () => {
      shouldHide.value = false;
    },
  });

  const ua = useAnimatedStyle(() => {
    if (shouldHide.value) {
      return {
        height: withTiming(0, {
          duration: 500,
          easing: Easing.bezier(0.5, 0.01, 0, 1),
        }),
      };
    } else {
      return {
        height: withTiming(100, {
          duration: 500,
          easing: Easing.bezier(0.5, 0.01, 0, 1),
        }),
      };
    }
  });

  return (
    <PanGestureHandler onGestureEvent={onScrollHandler}>
      <Animated.View
        style={[
          {
            width: '100%',
            justifyContent: 'space-around',
            flexDirection: 'row',
          },
          ua,
        ]}>
        <TouchableOpacity>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <TabComponent {...props} />}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
