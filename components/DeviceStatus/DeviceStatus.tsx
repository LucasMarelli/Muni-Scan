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
      if (!newData) setError("No hay registro de reparación");
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
    setId(newData?.id ?? null);
    setData(newData);
  }
  const handleConfirmChange = async (data: Partial<Repair>) => {
    setStatusModalVisible(false);
    setDeliveredModalVisible(false);
    if (!id)
      return Alert.alert(
        "Error",
        "No se pudo actualizar el estado. No se puedo obtener el id re la reparación"
      );
    setLoading(true);
    try {
      await repairTableService.updateById(id, data);
      await getAndSetData(serial);
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo actualizar el estado. Por favor, inténtalo de nuevo\n" +
          error
      );
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <ActivityIndicator />;
  if (error)
    return <Error onPress={() => getAndSetData(serial)} error={error} />;
  if (!data) return;
  return (
    <ThemedView style={{ flexDirection: "row", gap: 10 }}>
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

      <EditModal<Pick<Repair, "Entregado" | "¿A Quien se entregó?">>
        visible={deliveredModalVisible}
        onClose={() => setDeliveredModalVisible(false)}
        onConfirm={handleConfirmChange}
        defaultValue={{
          Entregado: data["Entregado"],
          "¿A Quien se entregó?": data["¿A Quien se entregó?"],
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
