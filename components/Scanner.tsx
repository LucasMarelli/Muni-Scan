import { useThemeColor } from "@/hooks/useThemeColor";
import { BarCodeEvent, BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
interface Props {
    onBarCodeScanned: (barCodeEvent: BarCodeEvent | null) => void,
}

export function Scanner(props: Props) {
    const { onBarCodeScanned } = props
    const [showScanner, setShowScanner] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showScanner) {
            timer = setTimeout(() => {
                setShowScanner(false);
            }, 30000);
        }
        return () => clearTimeout(timer);
    }, [showScanner]);

    const handlePress = () => {
        const newState = !showScanner
        setShowScanner(newState);
        if (newState) onBarCodeScanned(null);
    };

    const handleBarCodeScanned = (event: BarCodeEvent) => {
        onBarCodeScanned(event);
        setShowScanner(false);
    }

    return (
        <>
            {
                showScanner ?
                    <View style={styles.scannerContainer} >
                        <BarCodeScanner
                            onBarCodeScanned={!showScanner ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </View >
                    : null
            }
            <Button title={showScanner ? "Cerrar" : "Toca para escanear"} onPress={handlePress} />
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