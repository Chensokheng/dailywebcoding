import type { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { CgTrashEmpty } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import { MdCached } from "react-icons/md";

import EditorLayout, { useEditor } from "layout/EditorLayout";
import Loading from "@/components/Loading";

function Posts() {
    const { posts, deletePost, updateCache, setUpdateIndex, loading, user } =
        useEditor();
    const router = useRouter();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        router.push("/editor/login");
        return <Loading />;
    }

    return (
        <div className="max-w-4xl mx-auto mb-72 p-5 md:p-0">
            <div className="flex justify-between items-center ">
                <h1 className="text-gray-400 text-lg">List of post</h1>
                <div
                    onClick={() => {
                        setUpdateIndex(-1);
                        router.push("/editor/new");
                    }}
                >
                    <button className="bg-secondary px-5 py-3 rounded-sm hover:ring-1 hover:ring-green-500 transition-all">
                        Create
                    </button>
                </div>
            </div>
            <div>
                {posts.map((post, index) => {
                    let createdAt = post.createdAt;
                    if (typeof createdAt !== "string") {
                        createdAt = new Date(createdAt.toDate()).toDateString();
                    }

                    return (
                        <div
                            className="mt-5 flex justify-between items-center hover:ring-1 ring-green-500 transition-all rounded-md p-2 cursor-pointer"
                            key={index}
                        >
                            <Link href={`/${post.id}`}>
                                <div>
                                    <h1 className="text-2xl">{post.title}</h1>
                                    <p className="text-gray-400 text-sm">
                                        {createdAt}
                                    </p>
                                </div>
                            </Link>

                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 bg-red-500 hover:tracking-wider hover:bg-red-800 rounded-md transition-all"
                                    onClick={() => {
                                        deletePost(post.id);
                                    }}
                                >
                                    <CgTrashEmpty />
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 hover:tracking-wider hover:bg-blue-800 rounded-md transition-all"
                                    onClick={() => {
                                        setUpdateIndex(index);
                                        router.push("/editor/update");
                                    }}
                                >
                                    <FiEdit2 />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button
                className="flex gap-2 items-center bg-secondary px-2 py-4 mt-5 rounded-md hover:ring-green-500 hover:ring-2 transition-all "
                onClick={updateCache}
            >
                <h1>Revalidate</h1>
                <MdCached className="tex-xl" />
            </button>
        </div>
    );
}

Posts.getLayout = function getLayout(page: ReactElement) {
    return <EditorLayout>{page}</EditorLayout>;
};

export default Posts;
