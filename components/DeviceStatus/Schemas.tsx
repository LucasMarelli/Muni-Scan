import { DeliveredStatus, Repair, Status } from "@/entities/repair.entity";
import { Schemas } from "../EditModal/EditStatusModal";
import { statusColors } from "@/constants/Colors";

export const deliveredSchema: Schemas<
  Pick<Repair, "Entregado" | "¿A Quien se entregó?">
> = [
  {
    fieldName: "Entregado",
    required: true,
    type: "picker",
    options: Object.values(DeliveredStatus).map((value) => {
      return {
        label:
          value == "Sí" ? "Entregado" : value == "No" ? "No Entregado" : value,
        value,
        color: statusColors[value],
      };
    }),
  },
  {
    fieldName: "¿A Quien se entregó?",
    type: "text",
    required: (data) => data["Entregado"] === "Sí",
  },
];

export const statusSchema: Schemas<Pick<Repair, "Estado" | "Observación">> = [
  {
    fieldName: "Estado",
    required: true,
    type: "picker",
    options: Object.values(Status).map((value) => {
      return {
        label: value,
        value,
        color: statusColors[value],
      };
    }),
  },
  {
    label: "Observación / ¿Como se reparó?",
    fieldName: "Observación",
    type: "text",
    required: (data) =>
      data["Estado"] === "Reparado" || data["Estado"] === "Sin Reparación",
  },
];
