import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers';
import Board from './src/components/Board';

const store = createStore(reducer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Board />
      </View>
    </Provider>
  );
}
