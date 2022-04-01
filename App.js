import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';

NfcManager.start();

function App() {
  async function readNdef() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log('big yikes');
      console.warn(
        'Tag found',
        Ndef.text.decodePayload(tag.ndefMessage[0].payload),
      );
    } catch (ex) {
      console.log('Yikes');
      console.warn('Oops!', ex);
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  }
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={readNdef}>
        <Text style={{color: 'white', fontSize: 15}}>READ</Text>
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
  button: {
    padding: 10,
    width: 150,
    alignItems: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 3,
  },
});

export default App;
