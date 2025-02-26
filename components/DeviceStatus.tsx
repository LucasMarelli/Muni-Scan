import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Chip } from "react-native-paper";
import { EditStatusModal, Schema } from "./EditStatusModal";
import { DeliveredStatus, Repair, Status } from "@/entities/repair.entity";
import { statusColors } from "@/constants/Colors";

export function DeviceStatus({ serial }: { serial: string }) {
  const [data, setData] = useState<Repair | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"status" | "delivered" | null>(
    null
  );

  useEffect(() => {
    // Llamada API para obtener datos de la última reparación
    setData({
      Estado: Status.Repaired,
      Entregado: DeliveredStatus.NotDelivered,
      Observación: "Es una observación de prueba",
      "¿A quien se entregó?": "Se dejó en el servicio",
      Equipo: "",
      timestamp: "",
      id: "1234",
      Serie: "1234",
    });
  }, [serial]);

  const handleOpenModal = (type: "status" | "delivered") => {
    setModalVisible(true);
  };

  const handleConfirmChange = (data: Partial<Repair>) => {
    console.log(data);
    setModalVisible(false);
  };

  if (!data) return null;
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <TouchableOpacity onPress={() => handleOpenModal("status")}>
        {data && data["Estado"] && (
          <Chip
            style={{ backgroundColor: statusColors[data.Estado] }}
            textStyle={{ color: "white" }}
          >
            {data.Estado}
          </Chip>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleOpenModal("delivered")}>
        {data && data["Entregado"] && (
          <Chip
            style={{ backgroundColor: statusColors[data["Entregado"]] }}
            textStyle={{ color: "white" }}
          >
            {data.Entregado === "Si" ? "Entregado" : "No Entregado"}
          </Chip>
        )}
      </TouchableOpacity>

      <EditStatusModal<Pick<Repair, "Entregado" | "¿A quien se entregó?">>
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmChange}
        defaultValue={{
          Entregado: DeliveredStatus.Delivered,
          "¿A quien se entregó?": data["¿A quien se entregó?"],
        }}
        schema={deliveredSchema}
        title={"Modificar Estado de Última Reparación"}
        subtitle="¿Querés modificar estado de  la última reparación a:"
      />
    </View>
  );
}

const deliveredSchema: Schema<
  Pick<Repair, "Entregado" | "¿A quien se entregó?">
> = [
  {
    fieldName: "Entregado",
    type: "picker",
    options: Object.values(DeliveredStatus).map((value) => {
      console.log("value",value)
      console.log("value",statusColors)
      return {
        label:
          value == "Si" ? "Entregado" : value == "No" ? "No Entregado" : value,
        value,
        color: statusColors[value],
      };
    }),
  },
  {
    fieldName: "¿A quien se entregó?",
    type: "text",
    required: true,
  },
];

export type StatusOrDeliveredValues = DeliveredStatus | Status;
