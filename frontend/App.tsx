import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ItemsContainer from "./src/Screens/Items/ItemsContainer";

export default function App() {
  return (
    <View style={styles.container}>
      <ItemsContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
