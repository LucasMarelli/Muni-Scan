import { TextInput } from "react-native-paper";
import { Schema } from "../EditStatusModal";
import { StyleSheet, View } from "react-native";
import { PickerInput } from "./PickerInput";
import { Sign } from "./SignatureInput";

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
        <PickerInput<T>
          schema={schema}
          value={value}
          handleChange={handleChange}
        />
      );
    case "signature":
      return <Sign onOK={() => console.log("OK")} />;
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
