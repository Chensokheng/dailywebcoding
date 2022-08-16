import Link from "next/link";
import React, { ReactElement } from "react";

import Footer from "@/components/Footer";

interface Props {
    children: ReactElement;
}

export default function AppLayout({ children }: Props) {
    return (
        <div className="bg-primary">
            <nav className="px-5 xl:px-0 max-w-7xl h-10 mx-auto flex justify-between  py-10 sm:py-16 items-center">
                <Link href="/">
                    <div className="group cursor-pointer">
                        <h1 className="text-3xl font-bold cursor-pointer">
                            My blog
                        </h1>
                        <div className="group-hover:h-px mt-2 bg-white group-hover:w-full w-0 transition-all"></div>
                    </div>
                </Link>
                <Link href="/about">
                    <div className="group cursor-pointer">
                        <h1 className="group-hover:text-yellow-400 transition-all">
                            About
                        </h1>
                        <div className="group-hover:h-px bg-yellow-400 group-hover:w-full w-0 transition-all mt-2"></div>
                    </div>
                </Link>
            </nav>
            {children}
            <Footer />
        </div>
    );
}
