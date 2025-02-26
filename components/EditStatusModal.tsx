import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Portal, Dialog, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { ThemedText } from "./ThemedText";

export type Schema<T> = {
  fieldName: keyof T;
  type?: "picker" | "text";
  required?: boolean;
  options?: { label: string; value: string; color?: string }[];
}[];
interface EditStatusModalProps<T extends Object> {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: T) => void;
  title: string;
  subtitle?: string;
  schema: Schema<T>;
  defaultValue?: T;
}
export function EditStatusModal<T extends Object>({
  visible,
  onClose,
  onConfirm,
  title,
  subtitle,
  schema,
  defaultValue,
}: EditStatusModalProps<T>) {
  const [value, setValue] = useState<T | undefined>();

  function handleChange(fieldName: string, val: string) {
    setValue({ ...value, [fieldName]: val } as T);
  }

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <ThemedText style={styles.text}>{subtitle}</ThemedText>
          <View style={{ gap: 10 }}>
            {schema.map((sch) => {
              const val = value?.[sch.fieldName] ?? "";
              switch (sch.type) {
                case "picker":
                  return (
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <RNPickerSelect
                        onValueChange={(value) => {
                          handleChange(sch.fieldName as string, value);
                        }}
                        items={sch.options ?? []}
                        value={val}
                        style={{
                          inputIOS: {
                            ...styles.picker,
                            backgroundColor: "red",
                          },
                          inputAndroid: {
                            ...styles.picker,
                            backgroundColor: sch.options?.find(
                              (option) => option.value === val
                            )?.color,
                          },
                        }}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                      />
                    </View>
                  );
                default:
                  return (
                    <TextInput
                      multiline
                      label={sch.fieldName as string}
                      value={val as string}
                      onChangeText={(value) =>
                        handleChange(sch.fieldName as string, value)
                      }
                    ></TextInput>
                  );
              }
            })}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancelar</Button>
          <Button
            onPress={() => {
              if (value) onConfirm(value);
            }}
          >
            Confirmar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
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
