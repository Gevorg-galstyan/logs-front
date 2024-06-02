import {useEffect, FC, useState} from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import {Log, LogsReqParams, Token} from "types";

import { getLogs } from "../api/logs";

import TableComponent from "../Components/UI/TableComponent.tsx";

const HomePage: FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const [logs, setLogs] = useState<Log[]>([]);
    const [page, setPage] = useState<number>(1);
    const [skip, setSkip] = useState<number>(20);
    const [date, setDate] = useState<string>('');
    const [total, setTotal] = useState<number>(logs.length);

    useEffect(() => {
        const token: Token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        }

        getUsersLogs({page, skip, date});
    }, [navigate]);

    const getUsersLogs = async (params: LogsReqParams): Promise<void> => {
        try {
            const { logs, total} = await getLogs(params);

            setLogs(logs);
            setTotal(total);
        } catch (err) {
            console.error(err);
        }
    };

    const setTablePage = async (page: number): Promise<void> => {
        setPage(page);

        await getUsersLogs({page, skip, date});
    };

    const setTableSkip = async (skip: number): Promise<void> => {
        setSkip(skip);
        setPage(1);

        await getUsersLogs({page: 1, skip, date});
    }

    const filter = async (): Promise<void> => {
        setPage(1);

        await getUsersLogs({page, skip, date});
    }

    return (
        <section className='main-section'>
            <TableComponent
                items={logs}
                page={page}
                skip={skip}
                total={total}
                date={date}
                changePage={setTablePage}
                changeSkip={setTableSkip}
                dateChange={setDate}
                filter={filter}
            />
        </section>
    );
};

export default HomePage;
