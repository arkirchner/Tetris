import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers';
import Board from './src/components/Board';
import { addPieceToBoard, movePieceDown } from './src/actions';

const store = createStore(reducer);

store.dispatch(addPieceToBoard([[1, 1], [1, 1]]));

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
