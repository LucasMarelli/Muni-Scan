export interface Repair {
    id: string;
    timestamp: string;
    Equipo: string;
    Serie: string;
    Sector?: string;
    Estado?: Status;
    Entregado?: DeliveredStatus;
    Observación?: string;
    Salida?: string;
    "¿A quien se entregó?"?: string;
}

export enum DeliveredStatus {
    Delivered = "Si",
    NotDelivered = "No"
}

export enum Status {
    Unreviewed = "Sin Revisar",
    InRepair = "En Reparación",
    InService = "En Service",
    Repaired = "Reparado",
    NotRepaired = "Sin Reparación",
}