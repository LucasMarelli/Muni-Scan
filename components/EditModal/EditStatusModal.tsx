import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, Portal, Dialog, TextInput } from "react-native-paper";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Input } from "./Input";
export type Schema<T> = {
  label?: string;
  fieldName: keyof T;
  type?: "picker" | "text";
  required?: boolean | ((data: T) => boolean);
  options?: { label: string; value: string; color?: string }[];
};
export type Schemas<T> = Schema<T>[];

interface EditModalProps<T extends Object> {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: T) => void;
  title: string;
  subtitle?: string;
  schemas: Schemas<T>;
  defaultValue?: T;
}
export function EditModal<T extends Object>({
  visible,
  onClose,
  onConfirm,
  title,
  subtitle,
  schemas,
  defaultValue,
}: EditModalProps<T>) {
  const [value, setValue] = useState<T | undefined>();

  function handleChange(fieldName: string, val: string) {
    setValue({ ...value, [fieldName]: val } as T);
  }

  function handleConfirm() {
    if (!value) return;
    const requiredFields = schemas.filter((sch) => {
      if (typeof sch.required === "function") {
        return sch.required(value);
      }
      return sch.required;
    });
    const missingFields = requiredFields.filter(
      (sch) => !value?.[sch.fieldName]
    );
    if (missingFields.length > 0) {
      const missingFieldsNames = missingFields
        .map((sch) => sch.label ?? sch.fieldName)
        .join("\n");
      Alert.alert(
        "Por favor, completa los campos obligatorios: ",
        missingFieldsNames
      );
      return;
    }
    onConfirm(value);
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
            {schemas.map((sch, index) => {
              const val = (value?.[sch.fieldName] as string) ?? "";
              return (
                <Input
                  key={index}
                  handleChange={handleChange}
                  value={val}
                  schema={sch}
                />
              );
            })}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancelar</Button>
          <Button
            onPress={() => {
              handleConfirm();
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

});
