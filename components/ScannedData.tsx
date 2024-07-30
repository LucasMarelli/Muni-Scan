import { useEffect, useState } from "react"
import { Button, FlatList, GestureResponderEvent, Linking, StyleSheet, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


interface Props {
    data?: string | null
}
export function ScannedData(props: Props) {
    const { data } = props
    if (!data) return null
    const [deviceData, setDeviceData] = useState<Record<string, "Tipo" | "Marca" | "Modelo" | "Serie" | "Sector"> | null>(null)

    function handleOnPress(gestureResponderEvent: GestureResponderEvent) {
        if (!deviceData) return
        const { Tipo, Marca, Modelo, Serie, Sector } = deviceData
        const linkToForm =
            `https://docs.google.com/forms/d/e/1FAIpQLSeIYntd1TIHuO2lewARdN_ES0wQ192sSg2mVhf6RQBLrtE9bw/viewform?usp=pp_url&entry.1528610661=${Tipo}-${Marca}-${Modelo}&entry.1029608639=${Serie}&entry.74352180=${Sector}`
        Linking.openURL(linkToForm);

    }

    useEffect(() => {
        setDeviceData(JSON.parse(data))
    }, [data])


    if (!deviceData) return null
    return (
        <View style={styles.container}>
            {
                Object.keys(deviceData).map((key) => {
                    return (<>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ ...styles.text, color: "gray" }}>{`${key}: `}</Text>
                            <Text style={{ ...styles.text }}>{deviceData[key]}</Text>
                        </View>
                    </>
                    )
                })
            }
            <View style={{ marginTop: 20 }}>
                <MaterialIcons name="home-repair-service" size={24} color="black" />
                <Button title="Ingreso Para reparar" onPress={handleOnPress} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: { color: "white", padding: 5, fontSize: 18 },
});
