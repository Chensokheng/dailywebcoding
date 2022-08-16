import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function Notfound() {
    return (
        <>
            <Head>
                <title>Not Found</title>
            </Head>
            <div className="h-99 w-full flex justify-center items-center bg-primary">
                <Link href={"/"}>
                    <div className="flex max-w-4xl group cursor-pointer flex-col sm:flex-row p-5 sm:p-0">
                        <div className="flex-1 flex flex-col justify-between mb-10 sm:mt-0">
                            <h1
                                className={`text-4xl  mb-10 sm:mt-0  animate-pop-700`}
                            >{`Uh oh 404 - We can't find the page you looking for.`}</h1>
                            <div>
                                <div className="flex items-center gap-10 animate-pop-700">
                                    <HiOutlineArrowNarrowLeft className="text-4xl group-hover:-translate-x-2 transition-all" />
                                    <h1 className="text-xl font-bold">
                                        Back to home page
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="mx-auto w-full h-96 sm:w-96  relative">
                                <Image
                                    src={
                                        "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    }
                                    alt="404"
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
                    </div>
                </Link>
            </div>
        </>
    );
}
