import Image from "next/image";
import Link from "next/link";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { IPost } from "@/lib/types";
import PostService from "@/lib/service/PostService";
import HomeSEO from "@/components/seo/HomeSEO";

interface Props {
    posts: IPost[];
}
const Home = ({ posts }: Props) => {
    if (!posts.length) {
        return null;
    }

    const latestPost = posts[0];
    const showDummy = posts.slice(1).length % 3 !== 0;

    return (
        <>
            <HomeSEO />
            <div className="bg-primary min-h-screen p-5 xl:p-0 w-full">
                <div className="max-w-7xl mx-auto pt-28 pb-36">
                    <Link href={`/${latestPost?.id}`}>
                        <div className="h-99 bg-secondary mb-10 rounded-md p-5 sm:px-20 py-20 flex justify-around items-center gap-20 group hover:ring-4 ring-blue-500 transition-all flex-col sm:flex-row  cursor-pointer">
                            <div className="w-full sm:w-96  h-full flex flex-col justify-between">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-300">
                                        {latestPost?.title}
                                    </h1>
                                    <p className="text-lg  mt-2 text-gray-400">
                                        {latestPost?.createdAt as string}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-10">
                                        <h1 className="text-xl font-bold">
                                            Read more
                                        </h1>
                                        <HiOutlineArrowNarrowRight className="text-4xl  group-hover:translate-x-2 transition-all" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-96  h-full relative">
                                <Image
                                    src={latestPost?.imageUrl as string}
                                    alt={latestPost?.title}
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
                    </Link>
                    <div className="flex gap-10 flex-wrap justify-center md:justify-between rounded-md">
                        {posts.slice(1).map((post, index) => {
                            return (
                                <Link href={`/${post.id}`} key={index}>
                                    <div className="w-96 group cursor-pointer">
                                        <div className="w-full h-96 mb-5 rounded-md relative group-hover:ring-4 ring-yellow-500 transition-all">
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
                                        <p className="text-sm text-gray-400">
                                            {post.createdAt as string}
                                        </p>
                                        <h1 className="text-2xl text-gray-300 mt-2 font-bold">
                                            {post.title}
                                        </h1>
                                    </div>
                                </Link>
                            );
                        })}
                        {showDummy && (
                            <div className="hidden w-96 h-72 text-2xl sm:flex justify-center items-center text-center p-5 rounded-md"></div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

export async function getStaticProps(context: any) {
    const posts = await PostService.listPosts();

    if (!posts.length) {
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }

    return {
        props: {
            posts,
        }, // will be passed to the page component as props
    };
}
