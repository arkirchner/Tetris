import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function BoardButton({ onPress, icon }) {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.button}>
      <Ionicons name={icon} size={70} />
    </TouchableOpacity>
  );
}

BoardButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
};

export default BoardButton;
