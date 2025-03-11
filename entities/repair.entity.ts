export interface Repair {
    id: string;
    Timestamp: string;
    Equipo: string;
    Serie: string;
    Sector?: string;
    Estado?: Status;
    Entregado?: DeliveredStatus;
    Observación?: string;
    Salida?: string;
    "¿A Quien se entregó?"?: string;
    Enlace: string;
}

export enum DeliveredStatus {
    Delivered = "Sí",
    NotDelivered = "No"
}

export enum Status {
    Unreviewed = "Sin Revisar",
    InRepair = "En Reparación",
    InService = "En Service",
    Repaired = "Reparado",
    NotRepaired = "Sin Reparación",
}