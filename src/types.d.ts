declare module 'types'{
    type ButtonProps = {
        text: string;
        disabled?: boolean;
        handleClick: () => void;
    }

    type Login = {
        username: string;
        password: string;
    }

    type Log = {
        "id": string,
        "date": string,
        "status": string,
        "username": string,
        "password": string,
        "firstName": string,
        "lastName": string,
        "description": string
    }

    type Logs = {
        logs: Log[],
        total: number
    };

    type LogsReqParams = {
        page?: number;
        skip?: number;
        date?: string | null;
    }

    type Token =  string | null;
}
