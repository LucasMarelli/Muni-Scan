import { BarCodeEvent, BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
interface Props {
    onBarCodeScanned: (barCodeEvent: BarCodeEvent | null) => void,
}

export function Scanner(props: Props) {
    const { onBarCodeScanned } = props
    const [scanned, setScanned] = useState(false);

    return (
        <>
            {
                scanned ?
                    <Button title="Toca para escanear de nuevo" onPress={() => { onBarCodeScanned(null); setScanned(false) }} />
                    : <View style={styles.scannerContainer} >
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : (p) => { onBarCodeScanned(p); setScanned(true) }}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </View >
            }
        </>
    )

}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 16,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
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