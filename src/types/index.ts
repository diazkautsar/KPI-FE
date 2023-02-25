export interface BaseInterfaceResponse {
    success: boolean;
    statusCode: number;
    message: string;
    messageTitle: string;
}

export interface LoginResponseInterface extends BaseInterfaceResponse {
    data?: null | { [K: string]: any }[] | { [K: string]: any };
}

export interface ConstructErrorResponseInterface extends BaseInterfaceResponse {
    data?: any;
}
