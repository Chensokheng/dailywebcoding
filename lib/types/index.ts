import { Timestamp } from "firebase/firestore";

export type IPost = {
    id: string;
    imageUrl?: string;
    title: string;
    content: string;
    createdAt: Timestamp | string;
};

export type IPostUpdate = {
    id?: string;
    imageUrl?: string;
    title?: string;
    content?: string;
    createdAt?: Timestamp | string;
};

export enum ALertEnum {
    DANGER = "danger",
    SUCCESS = "success",
    INFO = "info",
    LOADING = "loading",
}

export type IAlert = {
    message: string;
    type: ALertEnum;
};
