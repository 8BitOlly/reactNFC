import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native';
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

  async function writeNdef({type, value}) { 
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      console.log(userInput);
      const bytes = Ndef.encodeMessage([Ndef.textRecord('lol')]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    return result;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={readNdef}>
          <Text style={{color: 'white', fontSize: 15}}>READ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={writeNdef}>
          <Text style={{color: 'white', fontSize: 15}}>WRITE</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="Input text"/>
      <Text>{text}</Text>
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
  buttonWrapper: {
    margin: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 200,
    padding: 10,
  }
});

export default App;
