import { IPost } from "../types";

const staticPost: IPost[] = [
    {
        id: "0",
        title: "How I build my site",
        content:
            "Inside src/domain/usecases, `create authentication.ts.` This file will be an interface that will describe the authentication business rule.",
        createdAt: new Date().toDateString(),
        imageUrl:
            "https://images.unsplash.com/photo-1657299156791-44140a28a518?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
        id: "1",
        title: "Creating a realworld app with C# dotnet",
        content: "testing",
        createdAt: new Date().toDateString(),
        imageUrl:
            "https://images.unsplash.com/photo-1658678058931-f84127d6a4fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
    {
        id: "2",
        title: "Toptal Live Interview Questions & Answers",
        content: "testing",
        createdAt: new Date().toDateString(),
        imageUrl:
            "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
];

export default staticPost;
