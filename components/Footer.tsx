import React from "react";
import dynamic from "next/dynamic";

import { SiGithub, SiTwitter, SiYoutube } from "react-icons/si";

const SiteMap = dynamic(() => import("./SiteMap"), { ssr: false });

export default function Footer() {
    const contact = [
        {
            link: "tel:+85595419150",
            text: "Call me",
        },
        {
            link: "mailto:chensokheng@gmail.com",
            text: "Email me",
        },
    ];
    const socials = [
        {
            ICon: SiGithub,
            link: "https://github.com/Chensokheng",
        },
        {
            ICon: SiYoutube,
            link: "https://www.youtube.com/c/DailyWebCoding",
        },
        {
            ICon: SiTwitter,
            link: "https://twitter.com/SokhengChen",
        },
    ];

    return (
        <div className="w-full bg-primary border-t border-gray-500 p-5 xl:p-0 ">
            <div className="max-w-7xl mx-auto pt-10 sm:pt-0  grid grid-cols-2 gap-10 sm:grid-cols-3 sm:h-99 ">
                <div className="sm:py-28">
                    <h1 className="text-3xl font-bold text-gray-200">{`My blog`}</h1>
                    <p className="mt-5 text-gray-400 text-xl">
                        A directory of wonderful things
                    </p>
                    <div className="mt-10 flex gap-5 text-gray-200">
                        {socials.map(({ link, ICon }, index) => {
                            return (
                                <a
                                    href={link}
                                    key={index}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <ICon className="text-4xl" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <SiteMap />

                <div className="sm:py-28 text-gray-200 flex flex-col">
                    <h1 className="text-2xl font-bold">Contact</h1>
                    {contact.map(({ link, text }, index) => {
                        return (
                            <a
                                href={link}
                                className="mt-5 block text-xl text-gray-400"
                                key={index}
                            >
                                {text}
                            </a>
                        );
                    })}
                </div>
            </div>
            <h1 className="text-gray-400 text-xl max-w-7xl mx-auto pb-10 mt-10">
                All rights reserved © Chensokheng
            </h1>
        </div>
    );
}
