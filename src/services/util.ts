import axiosInstance from '../libs/axios';
import { constructErrorResponse } from '../helpers';
import { LoginResponseInterface, ConstructErrorResponseInterface } from '../types';
import axios from 'axios';

export const IMAGE_KIT_LINK = 'https://upload.imagekit.io/api/v1/files/upload';

export const getImageKitToken = async (): Promise<LoginResponseInterface | ConstructErrorResponseInterface> => {
    try {
        const response = await axiosInstance({
            method: 'get',
            url: '/util/token-image-kit',
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

export const uploadImageKit = async ({
    file,
    publicKey,
    signature,
    expire,
    token,
    fileName,
}: {
    file: any;
    publicKey: string;
    signature: string;
    expire: number;
    token: string;
    fileName: string;
}): Promise<any> => {
    try {
        const data = await axios.post(
            IMAGE_KIT_LINK,
            {
                file,
                publicKey,
                signature,
                expire,
                token,
                fileName,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return data;
    } catch (error) {
        return error;
    }
};
