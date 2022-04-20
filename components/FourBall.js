import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  ball: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});

const Ball = () => {
  return <View style={styles.ball}></View>;
};

export default Ball;
