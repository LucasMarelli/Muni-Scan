import { TextInput } from "react-native-paper";
import { Schema } from "./EditStatusModal";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

export function Input<T>({
  schema,
  value,
  handleChange,
}: {
  schema: Schema<T>;
  value: string;
  handleChange: (fieldName: string, value: string) => void;
}) {
  switch (schema.type) {
    case "picker":
      return (
        <View>
          {schema.label && (
            <ThemedText style={{ fontSize: 12 }}>{schema.label}</ThemedText>
          )}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <RNPickerSelect 
              onValueChange={(value) => {
                handleChange(schema.fieldName as string, value);
              }}
              items={schema.options ?? []}
              value={value}
              style={{
                inputIOS: {
                  ...styles.picker,
                  backgroundColor: "red",
                },
                inputAndroid: {
                  ...styles.picker,
                  backgroundColor: schema.options?.find(
                    (option) => option.value === value
                  )?.color,
                },
              }}
              useNativeAndroidPickerStyle={false}
              fixAndroidTouchableBug={true}
            />
          </View>
        </View>
      );
    default:
      return (
        <TextInput
          multiline
          label={schema.label ?? (schema.fieldName as string)}
          value={value as string}
          onChangeText={(value) =>
            handleChange(schema.fieldName as string, value)
          }
        ></TextInput>
      );
  }
}

const styles = StyleSheet.create({
    text: {
      fontSize: 16,
    },
    picker: {
      borderColor: "red",
      color: "white",
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
      padding: 5,
      paddingLeft: 20,
      paddingRight: 20,
      width: "auto",
    },
  });