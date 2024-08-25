import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const NoData = () => {
    return (
        <View style={styles.container}>
            <MaterialIcons name="search-off" size={64} color="gray" />
            <Text style={styles.text}>No se encontraron resultados.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 10
    },
});
