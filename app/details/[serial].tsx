import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { format, formatDistanceToNow } from 'date-fns';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { repairTableService } from "@/services/RepairTable";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Colors } from '@/constants/Colors';
import { Item } from '@/components/Item';
import { deviceTableService } from '@/services/DeviceTable';

const exludedFields = ["QR"]

export default function HistoryScreen() {
    const [data, setData] = useState<object | null>(null);
    const { serial } = useLocalSearchParams();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getAndSetData(serial as string);
    }, [serial]);

    async function getAndSetData(serial: string) {
        setLoading(true)
        try {
            const data_ = (await deviceTableService.getBySerial(serial)).data;
            if (Array.isArray(data_)) setData(data_[0]);
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Stack.Screen options={{ title: 'Datos de Equipo' }} />
            <ScrollView contentContainerStyle={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) :
                    <ThemedView style={styles.viewContainer}>
                        {data ? <Item data={data} excludeFields={exludedFields}></Item> : null}
                    </ThemedView>
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
});
