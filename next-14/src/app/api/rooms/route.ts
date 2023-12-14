import {dataApp} from "@/stores/data";

export async function GET(request: Request) {
    // @ts-ignore
    return Response.json(dataApp.room.items);
}
