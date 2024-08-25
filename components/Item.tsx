import { format, formatDate, formatDistanceToNow } from "date-fns";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { es } from 'date-fns/locale';
import { Colors } from '@/constants/Colors';
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { customFormatDate } from "@/utils/date";


type Props = {
    data: object,
    title?: string,
    excludeFields: string[],
}

type DataTypes = "text" | "url" | "date"

export function Item({ title, excludeFields = [], data }: Props) {
    const isDate = (value: any) => {
        if (value.length < 10 || !isNaN(value)) return false
        return !isNaN(Date.parse(value));
    }

    const getType = (value: string) => {
        return isDate(value) ? "date" : value.startsWith("https://") ? "url" : "text"
    }

    return (
        <ThemedView style={styles.itemContainer}>
            {title ? <ThemedText type='subtitle'>{title}</ThemedText> : null}
            {
                Object.keys(data).map((key) => {
                    //Excluye campos innecesarios
                    if (excludeFields.includes(key)) return null
                    const value = String(data[key as keyof typeof data]).trim();
                    //No muestra valores vacíos
                    if (!value) return null
                    const type = getType(value)
                    const Item = ItemMap[type]
                    return (
                        <View key={key} style={styles.row}>
                            <ThemedText style={{ ...styles.text, color: "gray" }}>{`${key}: `}</ThemedText>
                            <Item value={value} />
                        </View>
                    )
                })
            }
        </ThemedView>

    )
}


const ItemMap: Record<DataTypes, React.FC<{ value: string }>> = {
    text: ({ value }) => <ThemedText style={styles.text}>{value}</ThemedText>,
    url: ({ value }) =>
        <TouchableOpacity onPress={() => Linking.openURL(value)} style={{ flexDirection: "row", alignItems: "center", borderRadius: 10 }}>
            <ThemedText style={{ ...styles.text }} > {"Ver enlace"}</ThemedText>
            <Feather name="link" size={20} color={Colors.light.icon} />
        </TouchableOpacity>,
    date: ({ value }) => <ThemedText style={styles.text}>{customFormatDate(value)}</ThemedText>
}



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
    },
    viewContainer: {
        flex: 1
    },
    itemContainer: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
        borderColor: Colors.light.icon,
        borderWidth: 1
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 5
    },
    text: {
        padding: 5,
        fontSize: 18
    }
});
