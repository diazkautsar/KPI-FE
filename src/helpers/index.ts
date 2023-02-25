import { AxiosError } from 'axios';
import { ConstructErrorResponseInterface } from '../types';

export const constructErrorResponse = (error: any): ConstructErrorResponseInterface => {
    const success = false;
    if (error instanceof AxiosError) {
        const response = error.response;

        return {
            success,
            statusCode: response?.data.statusCode ?? 500,
            message: response?.data.message ?? 'Internal Server Error',
            messageTitle: response?.data.messageTitle ?? 'Internal Server Error',
        };
    }

    return {
        success,
        statusCode: 500,
        messageTitle: 'Internal Server Error',
        message: 'Internal Server Error',
    };
};
