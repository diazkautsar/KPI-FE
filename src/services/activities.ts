import axiosInstance from '../libs/axios';
import { constructErrorResponse } from '../helpers';
import { LoginResponseInterface, ConstructErrorResponseInterface } from '../types';

export const getActivities = async (): Promise<LoginResponseInterface | ConstructErrorResponseInterface> => {
    try {
        const response = await axiosInstance({
            method: 'get',
            url: '/activity',
        });

        return {
            success: response.data.success,
            statusCode: response.data.statusCode,
            message: response.data.message,
            messageTitle: response.data.messageTitle,
            data: response.data.data,
        };
    } catch (error) {
        return constructErrorResponse(error);
    }
};
