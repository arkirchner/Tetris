import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './src/reducers';
import Board from './src/components/Board';

const store = createStore(reducer, {}, applyMiddleware(thunk));

const styles = StyleSheet.create({
  container: {
    flex: 1
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
