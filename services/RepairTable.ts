import { DEVICE_TO_REPAIT_FORM, ScriptsUrls } from "@/constants/Links"
import axios from "axios";
import { Linking } from "react-native";

type GetAutocompleteLinkProp = Record<"type" | "brand" | "model" | "serial" | "sector", string>
class RepairTableService {
    gotoForm({ type, brand, model, serial, sector }: GetAutocompleteLinkProp) {
        const linkToForm = DEVICE_TO_REPAIT_FORM + `&entry.1528610661=${type}-${brand}-${model}&entry.1029608639=${serial}&entry.74352180=${sector}`
        return Linking.openURL(linkToForm);
    }
    getBySerial(serial: string) {
        const url = ScriptsUrls.REPAIR_TABLE_GET_BY_SERIAL + "/exec?" + "serial=" + serial
        return axios.get(url)
    }
}

export const repairTableService = new RepairTableService()