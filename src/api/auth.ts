import {AxiosResponse} from "axios";
import {Login} from "types";

import httpClient from "./httpClient.ts";

export const login = async (username: Login['username'], password: Login['password']): Promise<string | undefined> => {
    const response: AxiosResponse = await httpClient.post('/login', { username, password});

    localStorage.setItem('token', response.data);

    return response.data;
}
