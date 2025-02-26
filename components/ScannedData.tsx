import { useEffect, useState } from "react"
import { Button, FlatList, GestureResponderEvent, Linking, StyleSheet, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from "./ThemedText";
import { repairTableService } from "@/services/RepairTable";
import { Link } from "expo-router";
import { DeviceStatus } from "./DeviceStatus";


interface Props {
    rawData?: string | null
}
export function ShowDevice(props: Props) {
    // const { rawData: data } = props
    const data =JSON.stringify( {
        Marca: "Samsung",
        Modelo: "S20",
        Serie: "144-5388",
        Sector: "A",
        Tipo: "Celular"

    } as Record<"Tipo" | "Marca" | "Modelo" | "Serie" | "Sector", string>)
    if (!data) return null
    const [deviceData, setDeviceData] = useState<Record<"Tipo" | "Marca" | "Modelo" | "Serie" | "Sector", string> | null>(null)

    function handleOnPressRepair(gestureResponderEvent: GestureResponderEvent) {
        if (!deviceData) return
        const { Tipo, Marca, Modelo, Serie, Sector } = deviceData
        return repairTableService.gotoForm({ type: Tipo, brand: Marca, model: Modelo, sector: Sector, serial: Serie })
    }

    useEffect(() => {
        setDeviceData(JSON.parse(data))
    }, [data])


    if (!deviceData) return null
    return (
        <View style={styles.container}>
            {
                Object.keys(deviceData).map((key) => {
                    return (
                        <View style={{ flexDirection: "row" }}>
                            <ThemedText style={{ ...styles.text, color: "gray" }}>{`${key}: `}</ThemedText>
                            <ThemedText style={{ ...styles.text }}>{deviceData[key as keyof typeof deviceData]}</ThemedText>
                        </View>
                    )
                })
            }
            <View style={styles.buttonContainer}>
            <DeviceStatus serial={deviceData.Serie}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Ingreso Para reparar" onPress={handleOnPressRepair} />
            </View>
            <View style={styles.buttonContainer}>
                <Link href={{ pathname: "/details/[serial]", params: { serial: deviceData.Serie } }} asChild>
                    <Button title="Ver Más Datos" />
                </Link>
            </View >
            <View style={styles.buttonContainer}>
                <Link href={{ pathname: "/history/[serial]", params: { serial: deviceData.Serie } }} asChild>
                    <Button title="Ver Histórico" />
                </Link>
            </View >
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 40
    },
    text: { padding: 5, fontSize: 18 },
    buttonContainer: { marginTop: 10 }
});
