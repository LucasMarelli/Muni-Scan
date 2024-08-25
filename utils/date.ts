import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const customFormatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "dd/MM/yyyy HH:mm");
    const distance = formatDistanceToNow(date, { addSuffix: true, locale: es });
    return `${formattedDate} (${distance})`;
}