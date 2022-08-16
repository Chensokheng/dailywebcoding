import React from "react";
import Head from "next/head";

interface Props {
    description: string;
    title: string;
    image?: string;
}

export default function BlogDetailSEO({ description, title, image }: Props) {
    return (
        <Head>
            <title>Daily web coding</title>
            <meta name="description" content={description} />
            <meta name="author" content="chensokheng" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta property="og:image" content={image} />
            {/* for twitter */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
