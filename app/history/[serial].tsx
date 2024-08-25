import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { format, formatDistanceToNow } from 'date-fns';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { repairTableService } from "@/services/RepairTable";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Colors } from '@/constants/Colors';
import { Item } from '@/components/Item';
import { NoData } from '@/components/NoData';

const exludedFields = ["Equipo","Serie"]

export default function HistoryScreen() {
    const [data, setData] = useState<any[]>([]);
    const { serial } = useLocalSearchParams();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getAndSetData(serial as string);
    }, [serial]);

    async function getAndSetData(serial: string) {
        setLoading(true)
        try {
            const data_ = (await repairTableService.getBySerial(serial)).data;
            //data_.push(data_[0], data_[0])
            if (Array.isArray(data_)) setData(data_);
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Stack.Screen options={{ title: 'Histórico' }} />
            <ScrollView contentContainerStyle={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) :
                    data.length ?
                        <ThemedView style={styles.viewContainer}>
                            {
                                data.map((d, index) => (
                                    <Item data={d} title={`Servicio ${index + 1}/${data.length}`} excludeFields={exludedFields}></Item>
                                ))
                            }
                        </ThemedView>
                        : <NoData />
                }
            </ScrollView>
        </>
    );
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
