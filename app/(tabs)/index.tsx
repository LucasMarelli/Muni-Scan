import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Button, Text, View } from 'react-native';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Scanner } from '@/components/Scanner';
import { ScannedData } from '@/components/ScannedData';

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (barCodeEvent: BarCodeEvent | null) => {
    setScannedData(barCodeEvent?.data ?? null);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'white', dark: 'white' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo-municipalidad.png')}
          style={styles.logo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Escaneá el Equipo</ThemedText>
        <HelloWave />
      </ThemedView>
      <ScannedData data={scannedData} />
      <Scanner onBarCodeScanned={handleBarCodeScanned} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 16,
  },
  logo: {
    alignSelf:"center",
    justifyContent:"center"
  },
  scannerContainer: {
    flex: 1,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 16,
  },
  scannedDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
