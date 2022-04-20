import React, {useRef, useEffect} from 'react';
import {Animated, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
});

const Triangle = ({width, color}) => {
  return (
    <View
      style={[
        styles.triangle,
        {
          borderWidth: width,
          borderTopColor: color,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
        },
      ]}
    />
  );
};

const RotateTriangle = ({width = 16, color = 'blue'}) => {
  let value1 = useRef(new Animated.Value(0)).current;
  let value2 = useRef(new Animated.Value(0)).current;
  let currentStep = 0;

  const rotate1 = () => {
    Animated.timing(value1, {
      toValue: currentStep + 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      currentStep = currentStep + 1;
      rotate2();
    });
  };

  const rotate2 = () => {
    Animated.timing(value2, {
      toValue: currentStep + 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotate1();
    });
  };

  useEffect(() => {
    rotate2();
  }, [rotate2]);

  const spin1 = value1.interpolate({
    inputRange: [currentStep, currentStep + 1],
    outputRange: [currentStep * 90 + 'deg', (currentStep + 1) * 90 + 'deg'],
  });

  const spin2 = value2.interpolate({
    inputRange: [currentStep, currentStep + 1],
    outputRange: [
      (currentStep + 1) * 90 + 'deg',
      (currentStep + 2) * 90 + 'deg',
    ],
  });

  return (
    <View>
      <Animated.View style={{transform: [{rotate: spin1}]}}>
        <Triangle width={width} color={color} />
      </Animated.View>
      <Animated.View
        style={{
          transform: [{rotate: spin2}],
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
        <Triangle width={width} color={color} />
      </Animated.View>
    </View>
  );
};

export default RotateTriangle;
