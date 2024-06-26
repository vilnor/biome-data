import useSWR, { Fetcher } from 'swr';
import { SensorData } from '../types';
import { useMemo } from 'react';

console.log(process.env.REACT_APP_API_URL);

const ENDPOINT = `${process.env.REACT_APP_API_URL}/api/data`;

const fetcher: Fetcher<SensorData[], string> = (...args) => fetch(...args).then(res => res.json());

export default function useData(sensorName?: string, startTime?: string, endTime?: string) {
    const queryParams = useMemo(() => {
        const params = new URLSearchParams();

        if (startTime) {
            params.append('startTime', startTime);
        }

        if (endTime) {
            params.append('endTime', endTime);
        }

        return params.toString();
    }, [startTime, endTime]);

    const {
        data,
        error,
        isLoading,
    } = useSWR(`${ENDPOINT}${!!sensorName ? ('/' + sensorName) : ''}${!!queryParams ? ('?' + queryParams) : ''}`, fetcher);

    return {
        data,
        isLoading,
        isError: error,
    };
}