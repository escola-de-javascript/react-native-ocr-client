import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { handleUpload } from './api/ocr';
import { RNCamera } from "react-native-camera";
import Spinner from 'react-native-loading-spinner-overlay';

export default class App extends Component {
  state = {
    spinner: false
  };

  takePicture = async () => {
    if (this.camera) {
      this.setState({ spinner: true });
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const text = await handleUpload(data);
      this.setState({ spinner: false });

      Alert.alert("Texto Extraído", text.data.trim());
    }
  };

  render() {
    const { visible } = this.state;
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Processando Imagem... 😉'}
          textStyle={styles.spinnerTextStyle}
        />
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={styles.buttonText}> Foto </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  buttonText: {
    fontSize: 14
  },
});