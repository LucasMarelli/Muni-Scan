import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Image, Linking, Pressable, StyleSheet, TouchableOpacity } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useThemeColor } from "@/hooks/useThemeColor"
import { Colors } from "@/constants/Colors";
import { DEVICE_TO_REPAIT_FORM, GENERATOR_CHECK_FORM } from "@/constants/Links";

export default function FormsScreen() {
    const color = useThemeColor({}, 'text');

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
                <ThemedText type="title">Formularios</ThemedText>
                <AntDesign name="form" size={32} color={color} style={{ marginLeft: 5 }} />
            </ThemedView>
            <ThemedView style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(DEVICE_TO_REPAIT_FORM)} >
                    <AntDesign name="tool" size={32} color={color} />
                    <ThemedText type="subtitle" style={styles.buttonText}>Ingreso de Equipo Para Reparar</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(GENERATOR_CHECK_FORM)}>
                    <AntDesign name="checkcircleo" size={32} color={color} />
                    <ThemedText type="subtitle" style={styles.buttonText}>Verificación de Grupo Electrógeno</ThemedText>
                </TouchableOpacity>

            </ThemedView>

        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({

    logo: {
        alignSelf: "center",
        justifyContent: "center"
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 16,

    },
    buttonContainer: {
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
    },
    buttonText: {
        padding: 8,
    },
})
