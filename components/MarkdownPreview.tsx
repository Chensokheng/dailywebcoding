import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

interface Props {
    content: string;
    className: string;
}
export default function MarkdownPreview({ content, className }: Props) {
    return (
        <ReactMarkdown
            className={` ${
                className
                    ? className
                    : "bg-secondary sm:p-5  ring-green-500 ring-2 overflow-y-auto h-100 "
            } w-full mt-5 rounded-md   text-xl tracking-wide break-words leading-relaxed transition-all `}
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ node, ...props }) => {
                    return (
                        <h1
                            {...props}
                            className="text-5xl font-bold mt-10 mb-10"
                        />
                    );
                },
                h2: ({ node, ...props }) => {
                    return (
                        <h1
                            {...props}
                            className="text-4xl font-bold mt-10 mb-10"
                        />
                    );
                },
                h3: ({ node, ...props }) => {
                    return (
                        <h1
                            {...props}
                            className="text-2xl font-bold mt-10 mb-10"
                        />
                    );
                },
                h4: ({ node, ...props }) => {
                    return (
                        <h1
                            {...props}
                            className="text-xl font-bold mt-10 mb-10"
                        />
                    );
                },
                p: ({ node, ...props }) => {
                    return <p {...props} className="mt-5 mb-5" />;
                },
                code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <div className="mt-6">
                            <SyntaxHighlighter
                                language={match[1]}
                                style={atomDark}
                                showLineNumbers={true}
                                wrapLines={true}
                                PreTag="div"
                                customStyle={{
                                    fontSize: "1rem",
                                    background: "#031727",
                                }}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        </div>
                    ) : (
                        <code
                            className="text-lg break-words bg-slate-900  p-1 rounded-sm"
                            {...props}
                        >
                            {children}
                        </code>
                    );
                },
                blockquote: ({ node, ...props }) => {
                    return (
                        <div
                            className="mt-10 mb-10 bg-opacity-50 px-2 border-l-4 border-blue-600 text-blue-600 py-px flex relative text-lg"
                            style={{
                                background: "#242C3D",
                            }}
                        >
                            <blockquote {...props} className="mt-2" />
                        </div>
                    );
                },
                img: ({ node, ...props }) => {
                    return (
                        <>
                            <span className="block relative w-full h-96 rounded-md mt-5 mb-5">
                                <Image
                                    src={props?.src || ""}
                                    alt={props?.alt || ""}
                                    layout="fill"
                                    objectPosition="center"
                                    objectFit="contain"
                                    placeholder="blur"
                                    blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                                />
                            </span>
                        </>
                    );
                },
                a: ({ node, ...props }) => {
                    return (
                        <a
                            {...props}
                            className="text-blue-400 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
