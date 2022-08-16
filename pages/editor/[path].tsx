import type { ReactElement } from "react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { uid } from "uid";
import { Timestamp } from "firebase/firestore";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineItalic, AiOutlineBold, AiOutlineClear } from "react-icons/ai";

import EditorLayout, { useEditor } from "layout/EditorLayout";
import Loading from "@/components/Loading";
import { readLocal, setLocal } from "@/lib/utils/localStorage";
import MarkdownPreview from "@/components/MarkdownPreview";
import { IPostUpdate } from "@/lib/types";

function New() {
    const draft: IPostUpdate = readLocal("draft");

    const [error, setError] = useState("");
    const [isPreview, setIsPreview] = useState(false);
    const contentRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
    const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const imageRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const { createPost, posts, updateIndex, updatePost, loading, user } =
        useEditor();
    const router = useRouter();

    useEffect(() => {
        if (updateIndex !== -1) {
            const post = posts[updateIndex];
            contentRef.current.value = post.content;
            titleRef.current.value = post.title;
            imageRef.current.value = post.imageUrl || "";
        }
    }, [updateIndex, posts]);

    const handleCreatePost = async () => {
        const id = uid(16);
        const { title, content, imageUrl } = readInputs();
        const createdAt = Timestamp.fromDate(new Date());

        if (validate(title, content)) {
            if (updateIndex === -1) {
                const newPost = { title, content, createdAt, id, imageUrl };
                createPost(newPost);
            } else {
                handleUpdate();
            }
        }
    };
    const handleUpdate = () => {
        const post = posts[updateIndex];
        const { title, content, imageUrl } = readInputs();
        let updatePath = [];

        if (title !== post.title || imageUrl !== post.imageUrl) {
            updatePath = ["/", `/${post.id}`];
        } else if (content !== post.content) {
            updatePath.push(`/${post.id}`);
        }

        if (updatePath.length !== 0) {
            updatePost(post.id, { title, content, imageUrl }, updatePath);
        } else {
            router.push("/editor");
        }
    };

    const readInputs = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const imageUrl = imageRef.current.value;
        return { title, content, imageUrl };
    };

    const onChange = () => {
        const { title, content, imageUrl } = readInputs();
        setLocal("draft", { title, imageUrl, content });
    };

    const validate = (title: string, content: string) => {
        if (title.trim().length < 10) {
            setError("Title is too short.");
            return false;
        } else if (content.trim().length < 30) {
            setError("Content is too short.");
            return false;
        }
        setError("");
        return true;
    };

    const clearDraft = () => {
        const { content, title, imageUrl } = readInputs();
        if (content || title || imageUrl) {
            const shouldClear = window.confirm("Are you sure?");
            if (shouldClear) {
                window.localStorage.removeItem("draft");
                titleRef.current.value = "";
                contentRef.current.value = "";
                imageRef.current.value = "";
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        router.push("/login");
        return <Loading />;
    }

    const shouldPreview = isPreview && contentRef.current.value;
    return (
        <div className="max-w-4xl mx-auto pb-28">
            <Link href="/editor">
                <div className="flex items-center gap-10 group cursor-pointer mb-20">
                    <HiOutlineArrowNarrowLeft className="text-4xl group-hover:-translate-x-1 transition-all" />
                    <h1 className="text-xl font-bold transition-all duration-1000">
                        Back to list
                    </h1>
                </div>
            </Link>
            <input
                type="text"
                className="w-full bg-secondary p-5 rounded-md hover:ring-2 hover:ring-gray-500 outline-none  transition-all mb-5"
                placeholder="Image link"
                ref={imageRef}
                onChange={onChange}
                defaultValue={draft?.imageUrl}
            />
            <input
                type="text"
                className="w-full bg-secondary p-5 rounded-md hover:ring-2 hover:ring-gray-500 outline-none text-2xl transition-all font-bold mt-5"
                placeholder="Title"
                ref={titleRef}
                onChange={onChange}
                defaultValue={draft?.title}
            />
            <p className="text-sm text-red-500 mt-3 mb-3">{error}</p>
            <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-5 items-center">
                    <AiOutlineItalic
                        className="text-2xl cursor-pointer hover:scale-125 transition-all"
                        onClick={() => {
                            contentRef.current.value += " *italic* ";
                        }}
                    />
                    <AiOutlineBold
                        className="text-2xl cursor-pointer hover:scale-125 transition-all"
                        onClick={() => {
                            contentRef.current.value += " **bold** ";
                        }}
                    />
                    <AiOutlineClear
                        className="text-2xl cursor-pointer hover:scale-125 transition-all"
                        onClick={clearDraft}
                    />
                    <button
                        className={`hover:ring-2 transition-all rounded-md hover:ring-gray-500 bg-secondary px-3 py-2 bg ${
                            shouldPreview ? "ring-2 ring-green-500" : ""
                        }`}
                        onClick={() => setIsPreview(!isPreview)}
                    >
                        {shouldPreview ? "Edit" : "Preview"}
                    </button>
                </div>
                <button
                    className={`ring-2 ring-green-700 transition-all rounded-md hover:ring-gray-400 hover:ring-2 bg-green-600 px-5 py-2 `}
                    onClick={handleCreatePost}
                >
                    {updateIndex !== -1 ? "Update" : "Post"}
                </button>
            </div>
            {shouldPreview && (
                <MarkdownPreview
                    content={contentRef.current.value || ""}
                    className=""
                />
            )}
            <textarea
                ref={contentRef}
                className={`${
                    shouldPreview ? "hidden" : ""
                } resize-none w-full  bg-secondary mt-5 h-100 rounded-md hover:ring-2 p-5 hover:ring-gray-500 outline-none text-xl transition-all leading-relaxed tracking-wide break-words placeholder:text-sm`}
                placeholder="Blog content as markdown"
                onChange={onChange}
                defaultValue={draft?.content}
            />
        </div>
    );
}

New.getLayout = function getLayout(page: ReactElement) {
    return <EditorLayout>{page}</EditorLayout>;
};

export default New;
