import { useEffect, useState } from "react";
import {
  Alert,
  GestureResponderEvent,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Chip } from "react-native-paper";
import { EditModal, Schemas } from "../EditModal/EditStatusModal";

import { DeliveredStatus, Repair, Status } from "@/entities/repair.entity";
import { statusColors } from "@/constants/Colors";
import { repairTableService } from "@/services/RepairTable";
import { ThemedText } from "../ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { deliveredSchema, statusSchema } from "./Schemas";
import { set } from "date-fns";
import _ from "lodash";
export function DeviceStatus({ serial }: { serial: string }) {
  const [data, setData] = useState<Repair | null>(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [deliveredModalVisible, setDeliveredModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    getAndSetData(serial);
  }, [serial]);

  async function getAndSetData(serial: string) {
    let newData = null;
    try {
      setError(null);
      setLoading(true);
      newData = (await repairTableService.findLastBySerial(serial)).data;
      if (!newData) {
        setError("No hay registro de reparación");
        setData(null);
        setId(null);
        return;
      }
    } catch (err) {
      console.error(err);
      setError("Error al obtener estado");
      return;
    } finally {
      setLoading(false);
    }
    if (newData && typeof newData === "object") {
      newData.Estado = newData.Estado || Status.Unreviewed;
      newData.Entregado = newData.Entregado || DeliveredStatus.NotDelivered;
    }
    setId(newData.id);
    setData(newData);
  }
  const handleConfirmChange = async (newData: Partial<Repair>) => {
    setStatusModalVisible(false);
    setDeliveredModalVisible(false);
    if (!id)
      return Alert.alert(
        "Error",
        "No se pudo actualizar el estado. No se puedo obtener el id re la reparación"
      );
    setLoading(true);
    try {
      // Si no hay cambios no actualiza
      let noChanges = true;
      for (const _key in newData) {
        if (Object.prototype.hasOwnProperty.call(newData, _key)) {
          const key = _key as keyof Repair;
          noChanges = newData[key] === data?.[key];
          if (!noChanges) break;
        }
      }
      if (noChanges) return;
      //Si cambió a entregado agrega estampa de tiempo en Salida.
      const changesToDelivered =
        newData.Entregado === DeliveredStatus.Delivered &&
        newData.Entregado !== data?.Entregado;
      if (changesToDelivered) newData.Salida = new Date().toISOString();
      await repairTableService.updateById(id, newData);
      await getAndSetData(serial);
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo actualizar el estado. Por favor, intentalo de nuevo\n" +
          error
      );
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <ActivityIndicator />;
  if (error)
    return <Error onPress={() => getAndSetData(serial)} error={error} />;
  if (!data) return null;
  return (
    <ThemedView style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
      <TouchableOpacity onPress={() => setStatusModalVisible(true)}>
        {data["Estado"] && (
          <Chip
            style={{ backgroundColor: statusColors[data.Estado] }}
            textStyle={{ color: "white" }}
          >
            {data.Estado}
          </Chip>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setDeliveredModalVisible(true)}>
        {data["Entregado"] && (
          <Chip
            style={{ backgroundColor: statusColors[data["Entregado"]] }}
            textStyle={{ color: "white" }}
          >
            {data.Entregado === "Sí"
              ? "Entregado"
              : data.Entregado === "No"
              ? "No Entregado"
              : data["Entregado"]}
          </Chip>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => getAndSetData(serial)}>
        <AntDesign
          name="reload1"
          size={20}
          style={{ marginLeft: 5, color: "gray" }}
        />
      </TouchableOpacity>

      <EditModal<Pick<Repair, "Entregado" | "¿A Quien se entregó?" | "Enlace">>
        visible={deliveredModalVisible}
        onClose={() => setDeliveredModalVisible(false)}
        onConfirm={handleConfirmChange}
        defaultValue={{
          Entregado: data["Entregado"],
          "¿A Quien se entregó?": data["¿A Quien se entregó?"],
          Enlace: data.Enlace,
        }}
        schemas={deliveredSchema}
        title={"Entrega de Última Reparación"}
        subtitle="Modificar entrega de  la última reparación a:"
      />

      <EditModal<Pick<Repair, "Estado" | "Observación">>
        visible={statusModalVisible}
        onClose={() => setStatusModalVisible(false)}
        onConfirm={handleConfirmChange}
        defaultValue={{
          Estado: data.Estado,
          Observación: data.Observación,
        }}
        schemas={statusSchema}
        title={"Estado de Última Reparación"}
        subtitle="Modificar estado de  la última reparación a:"
      />
    </ThemedView>
  );
}

function Error({
  onPress,
  error,
}: {
  onPress: (e: GestureResponderEvent) => void;
  error: string;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
      >
        <AntDesign
          name="reload1"
          size={12}
          style={{ marginLeft: 5, color: "gray" }}
        />
        <ThemedText style={{ fontSize: 12 }}>{error}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

export type StatusOrDeliveredValues = DeliveredStatus | Status;
