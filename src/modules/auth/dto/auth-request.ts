import type { Request } from "express";

export interface JwtUser {
    id: number;
    email: string;
}

export type AuthedRequest = Omit<Request, "user"> & {
    user?: JwtUser;
};
