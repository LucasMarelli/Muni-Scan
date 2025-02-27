import { DEVICE_TO_REPAIT_FORM, ScriptsUrls } from "@/constants/Links"
import { Repair } from "@/entities/repair.entity";
import { Linking } from "react-native";
import httpService from "./HttpService";

type GetAutocompleteLinkProp = Record<"type" | "brand" | "model" | "serial" | "sector", string>
class RepairTableService {
    gotoForm({ type, brand, model, serial, sector }: GetAutocompleteLinkProp) {
        const linkToForm = DEVICE_TO_REPAIT_FORM + `&entry.1528610661=${type}-${brand}-${model}&entry.1029608639=${serial}&entry.74352180=${sector}`
        return Linking.openURL(linkToForm);
    }
    findBySerial(serial: string) {
        const url = ScriptsUrls.REPAIR_TABLE + "/exec?" + "serial=" + serial
        return httpService.get<Repair[]>(url)
    }
    findLastBySerial(serial: string) {
        const url = ScriptsUrls.REPAIR_TABLE + "/exec?" + "serial=" + serial + "&action=find_last_by_serial"
        return httpService.get<Repair | null>(url)
    }

    updateById(id: string, data: Partial<Repair>) {
        const url = ScriptsUrls.REPAIR_TABLE + "/exec?" + "action=update_by_id&id=" + id
        return httpService.post(url, data)
    }
}

export const repairTableService = new RepairTableService()