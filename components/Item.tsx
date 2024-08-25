import { format, formatDistanceToNow } from "date-fns";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, View } from "react-native";
import { es } from 'date-fns/locale';
import { Colors } from '@/constants/Colors';


type Props = {
    data: object,
    title?: string,
    excludeFields: string[],
}
export function Item({ title, excludeFields = [], data }: Props) {
    const isDate = (value: any) => {
        if (value.length < 10 || !isNaN(value)) return false
        return !isNaN(Date.parse(value));
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = format(date, "dd/MM/yyyy HH:mm");
        const distance = formatDistanceToNow(date, { addSuffix: true, locale: es });
        return `${formattedDate} (${distance})`;
    }

    return (
        <ThemedView style={styles.itemContainer}>
            {title ? <ThemedText type='subtitle'>{title}</ThemedText> : null}
            {
                Object.keys(data).map((key) => {

                    const value = data[key as keyof typeof data];
                    const formattedValue = isDate(value) ? formatDate(value) : value;
                    //Excluye campos innecesarios
                    if (excludeFields.includes(key)) return null
                    //No muestra valores vacíos
                    if (!value) return null
                    return (
                        <View key={key} style={styles.row}>
                            <ThemedText style={{ ...styles.text, color: "gray" }}>{`${key}: `}</ThemedText>
                            <ThemedText style={styles.text}>{formattedValue}</ThemedText>
                        </View>
                    )
                })
            }
        </ThemedView>

    )
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
