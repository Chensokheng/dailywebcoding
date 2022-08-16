import {
    doc,
    setDoc,
    collection,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    limit,
} from "firebase/firestore";

import { db } from "../config/firebase";
import { IPost, IPostUpdate } from "../types";

class PostService {
    createPost(post: IPost) {
        return setDoc(doc(db, "posts", post.id), post);
    }

    async listPosts() {
        const querySnapshot = await getDocs(
            query(
                collection(db, "posts"),
                orderBy("createdAt", "asc"),
                limit(10)
            )
        );
        const posts: IPost[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data() as IPost;
            const createdAt = data.createdAt as any;
            posts.push({
                ...data,
                createdAt: new Date(createdAt.toDate()).toDateString(),
            });
        });
        return posts;
    }

    async getPost(id: string) {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as IPost;
            const createdAt = data.createdAt as any;
            data["createdAt"] = new Date(createdAt.toDate()).toDateString();
            return data;
        } else {
            return {};
        }
    }

    async updatePost(postId: string, object: IPostUpdate) {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, object);
    }

    async deletePost(postId: string) {
        const postRef = doc(db, "posts", postId);
        await deleteDoc(postRef);
    }
}

export default new PostService();
