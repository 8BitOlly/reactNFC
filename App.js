import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';

NfcManager.start();

function App() {
  const [input, setInput] = useState('');

  async function readNdef() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log(
        'Tag found',
        Ndef.text.decodePayload(tag.ndefMessage[0].payload),
      );
      
      Alert.alert(
        'Tag found',
         Ndef.text.decodePayload(tag.ndefMessage[0].payload),
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {text: 'Ok', onPress: () => console.log('Ok Pressed')}
        ]
      );

    } catch (ex) {
      console.log('Oops!', ex);
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  }

  async function writeNdef() { 
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord({input}.input)]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        console.log('Wrote' + {input}.input)
        result = true;
      }
    } catch (ex) {
      console.log(ex);
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
      <TextInput style={styles.input} placeholder="Input text" onChangeText={text => setInput(text)}/>
      <Text>Input: {input}</Text>
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
