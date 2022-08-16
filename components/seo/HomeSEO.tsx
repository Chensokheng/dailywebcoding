import Head from "next/head";
import React from "react";

export default function HomeSEO() {
    const description = "A directory of folder full things.";

    return (
        <Head>
            <title>Daily web coding</title>
            <meta name="description" content={description} />
            <meta
                name="keywords"
                content="blog, tech, coding, self-help, daily web coding, daily web, sokheng chen, chensokheng"
            />
            <meta name="author" content="chensokheng" />
            <meta property="og:title" content="Daily Web coding" />
            <meta property="og:description" content={description} />

            <meta
                property="og:image"
                content="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            />
            {/* for twitter */}
            <meta name="twitter:title" content="chensokheng" />
            <meta name="twitter:description" content={description} />
            <meta
                name="twitter:image"
                content="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
