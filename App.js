import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, State} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';

NfcManager.start();

function App() {
  async function readNdef() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.warn(
        'Tag found',
        Ndef.text.decodePayload(tag.ndefMessage[0].payload),
      );
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  }
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
