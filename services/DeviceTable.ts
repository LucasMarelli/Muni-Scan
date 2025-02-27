import { ScriptsUrls } from "@/constants/Links"
import httpService from "./HttpService";

class DeviceTableService {
    getBySerial(serial: string) {
        const url = ScriptsUrls.DEVICE_TABLE + "/exec?" + "serial=" + serial
        return httpService.get(url)
    }
}

export const deviceTableService = new DeviceTableService()