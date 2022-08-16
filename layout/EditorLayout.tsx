import { useRouter } from "next/router";
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    User,
} from "firebase/auth";

import PostService from "@/lib/service/PostService";
import { ALertEnum, IAlert, IPost, IPostUpdate } from "@/lib/types";
import revalidateCache from "@/lib/utils/revalidateCache";
import Alert from "../components/editor/Alert";

import { auth } from "@/lib/config/firebase";
import { setLocal } from "@/lib/utils/localStorage";
interface IEdtorContext {
    posts: IPost[];
    setUpdateIndex: Dispatch<SetStateAction<number>>;
    updateIndex: number;
    user: User | null;
    loading: boolean;
    createPost: (post: IPost) => void;
    deletePost: (id: string) => void;
    login: (email: string, password: string) => void;
    updateCache: () => void;
    updatePost: (id: string, post: IPostUpdate, updatePath: string[]) => void;
}

const editorContext = createContext<IEdtorContext>({} as IEdtorContext);

interface Props {
    children: React.ReactNode;
}

export default function EditorLayout({ children }: Props) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [updateIndex, setUpdateIndex] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState<IAlert>({
        type: ALertEnum.LOADING,
        message: "",
    });
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    const createPost = async (post: IPost) => {
        setAlert({
            type: ALertEnum.LOADING,
            message: `Creating a new post.`,
        });
        await PostService.createPost(post);
        setPosts((posts) => [post, ...posts]);
        setAlert({
            type: ALertEnum.SUCCESS,
            message: `Successfully create a post.`,
        });
        await updateCache();
        router.push("/editor");
    };

    const deletePost = async (id: string) => {
        const shouldDelete = window.confirm("Are you sure?");
        if (shouldDelete) {
            setAlert({
                type: ALertEnum.LOADING,
                message: `Deleting post/${id}`,
            });
            await PostService.deletePost(id);

            let updatedPost = [...posts];
            updatedPost = updatedPost.filter((post) => {
                if (post.id !== id) {
                    return post;
                }
            });
            setPosts(updatedPost);
            setAlert({
                type: ALertEnum.SUCCESS,
                message: `Successfully deleted post/${id}`,
            });
            await updateCache();
        }
    };

    const updateCache = async (paths = ["/"]) => {
        setAlert({
            type: ALertEnum.LOADING,
            message: `revalidate cache.`,
        });
        await revalidateCache(user?.uid || "", paths);
        setAlert({
            type: ALertEnum.SUCCESS,
            message: `Successfully updated cache.`,
        });
    };

    const updateAlert = (alert: IAlert) => {
        setAlert(alert);
    };

    const updatePost = async (
        id: string,
        post: IPostUpdate,
        updatePath: string[]
    ) => {
        setAlert({
            type: ALertEnum.LOADING,
            message: `Updating a post.`,
        });
        await PostService.updatePost(id, post);
        const updatePosts = [...posts];
        updatePosts[updateIndex] = {
            ...post,
            id,
            createdAt: new Date().toDateString(),
        } as IPost;
        setPosts(updatePosts);
        setAlert({
            type: ALertEnum.SUCCESS,
            message: `Successfully update a post.`,
        });
        await updateCache(updatePath);
        router.push("/editor");
    };

    const login = async (email: string, password: string) => {
        setAlert({ type: ALertEnum.LOADING, message: "Authenticating user" });
        await signInWithEmailAndPassword(auth, email, password);
        setLocal("auth", "true");
        router.push("/editor");
        setAlert({ type: ALertEnum.SUCCESS, message: "Successfully login" });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                PostService.listPosts()
                    .then((newPost) => {
                        setPosts(newPost);
                    })
                    .catch((e) => {
                        console.log(e.toString());
                    });
            } else {
                router.push("/editor/login");
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
        //eslint-disable-next-line
    }, []);

    return (
        <editorContext.Provider
            value={{
                posts,
                createPost,
                deletePost,
                user,
                login,
                updateCache,
                setUpdateIndex,
                updateIndex,
                updatePost,
                loading,
            }}
        >
            <div className="min-h-screen w-full bg-primary">
                <div className="min-h-screen">{children}</div>
                {alert.message && (
                    <Alert alert={alert} updateAlert={updateAlert} />
                )}
            </div>
        </editorContext.Provider>
    );
}

export const useEditor = () => {
    return useContext(editorContext);
};
