import { ScriptsUrls } from "@/constants/Links"
import axios from "axios";

class DeviceTableService {
    getBySerial(serial: string) {
        const url = ScriptsUrls.DEVICE_TABLE_GET_BY_SERIAL + "/exec?" + "serial=" + serial
        return axios.get(url)
    }
}

export const deviceTableService = new DeviceTableService()