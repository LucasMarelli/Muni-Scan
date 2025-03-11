import RNPickerSelect from "react-native-picker-select";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../../ThemedText";
import { Schema } from "../EditStatusModal";
type PickerInputProps<T> = {
  schema: Schema<T>;
  value: string;
  handleChange: (fieldName: string, value: string) => void;
};
export function PickerInput<T>({
  schema,
  value,
  handleChange,
}: PickerInputProps<T>) {
  return (
    <View>
      {schema.label && (
        <ThemedText style={{ fontSize: 12 }}>{schema.label}</ThemedText>
      )}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <RNPickerSelect
          onValueChange={(value) =>
            handleChange(schema.fieldName as string, value)
          }
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
}

const styles = StyleSheet.create({
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
