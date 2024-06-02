import httpClient from "./httpClient.ts";
import {Logs, LogsReqParams} from "types";
import {AxiosResponse} from "axios";

export const getLogs = async (params: LogsReqParams = {page: 1, skip: 20}): Promise<Logs> => {
    const response: AxiosResponse = await httpClient.get('/logs', {params});

    return response?.data || [];
}
