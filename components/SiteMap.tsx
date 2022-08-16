import { readLocal } from "@/lib/utils/localStorage";
import Link from "next/link";
import React from "react";

export default function SiteMap() {
    let siteMaps = [
        {
            link: "/",
            text: "Home",
        },
        {
            link: "/about",
            text: "About",
        },
    ];

    if (readLocal("auth")) {
        siteMaps.push({
            link: "/editor",
            text: "Editor",
        });
    }

    return (
        <div className="sm:py-28 text-gray-200">
            <h1 className="text-2xl font-bold">Site map</h1>
            {siteMaps.map(({ link, text }, index) => {
                return (
                    <Link href={link} key={index}>
                        <h1 className="mt-5 block text-xl text-gray-400 cursor-pointer">
                            {text}
                        </h1>
                    </Link>
                );
            })}
        </div>
    );
}
