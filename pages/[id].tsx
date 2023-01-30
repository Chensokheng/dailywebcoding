import React from "react";
import Image from "next/image";

import MarkdownPreview from "@/components/MarkdownPreview";
import PostService from "@/lib/service/PostService";
import { IPost } from "@/lib/types";
import BlogDetailSEO from "@/components/seo/BlogDetailSEO";
import Giscus from "@giscus/react";

interface Props {
    post: IPost;
}
export default function Detail({ post }: Props) {
    return (
        <>
            <BlogDetailSEO
                description={post.content.slice(0, 250)}
                title={post.title}
                image={post.imageUrl}
            />
            <div className="min-h-screen bg-primary w-full pt-10">
                <div className="p-5 max-w-4xl mx-auto">
                    <h1 className="text-5xl font-semibold">{post.title}</h1>
                    <p className="text-lg text-gray-500 mt-5">
                        {post.createdAt as string}
                    </p>
                </div>
                <div className="max-w-5xl mx-auto">
                    <div className="w-full h-99 mt-10 mb-10 rounded-md relative group-hover:ring-4 ring-yellow-500 transition-all">
                        <Image
                            src={post.imageUrl as string}
                            alt={post.title}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="rounded-md "
                            priority
                            placeholder="blur"
                            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                        />
                    </div>
                </div>
                <div className="p-5 sm:p-0 w-full sm:max-w-4xl mx-auto">
                    <MarkdownPreview
                        content={post.content}
                        className="bg-none sm:p-5 text-zinc-300"
                    />
                </div>
                <div className="h-28"></div>
                <div className="max-w-5xl mx-auto">
                    <Giscus
                        id="comments"
                        repo="Chensokheng/dailywebcoding"
                        repoId="R_kgDOH1AkNA"
                        category="Announcements"
                        categoryId="DIC_kwDOF1L2fM4B-hVS"
                        mapping="pathname"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="top"
                        theme="preferred_color_scheme"
                        lang="en"
                        loading="lazy"
                    />
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const posts = await PostService.listPosts();

    const paths = posts.map((post) => {
        return { params: { id: post.id.toString() } };
    });

    return {
        paths,
        fallback: "blocking", // false or 'blocking'
    };
}

export async function getStaticProps(context: any) {
    const post = await PostService.getPost(context.params.id);
    if (!post || !Object.keys(post).length) {
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }
    return {
        props: { post },
    };
}
