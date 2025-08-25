import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

function App(): React.JSX.Element {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const camera = useRef<Camera>(null);
  const [photoPath, setPhotoPath] = useState<string | null>(null);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const handleTakePhoto = async () => {
    if (camera.current == null || device == null) return;

    try {
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'speed',
        flash: 'off',
        enableShutterSound: false,
      });

      // Guardar la foto en el dispositivo
      await CameraRoll.save(`file://${photo.path}`, {
        type: 'photo',
      });

      setPhotoPath(`file://${photo.path}`);
      console.log('Foto guardada en:', photo.path);
    } catch (e) {
      console.error('Error al tomar la foto:', e);
    }
  };

  if (device == null) {
    return <Text>Cámara no encontrada</Text>;
  }

  if (!hasPermission) {
    return <Text>La app no tiene permisos para usar la cámara.</Text>;
  }

  return (
    <View style={styles.container}>
      {photoPath ? (
        <View style={styles.previewContainer}>
          <Image source={{uri: photoPath}} style={styles.preview} />
          <Button title="Tomar otra foto" onPress={() => setPhotoPath(null)} />
        </View>
      ) : (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <View style={styles.buttonContainer}>
            <Button title="Tomar Foto" onPress={handleTakePhoto} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default App;
