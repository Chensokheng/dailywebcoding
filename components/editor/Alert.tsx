import React, { useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgDanger, CgCheckO, CgInfo } from "react-icons/cg";

import { ALertEnum, IAlert } from "@/lib/types";

interface Props {
    alert: IAlert;
    updateAlert: (alert: IAlert) => void;
}

export default function Alert({ alert, updateAlert }: Props) {
    const [open, setOpen] = useState(false);
    const { message, type } = alert;

    useEffect(() => {
        setOpen(true);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 3000);

        const alertTimeout = setTimeout(() => {
            updateAlert({ message: "", type: ALertEnum.LOADING });
        }, 3500);

        return () => {
            clearTimeout(alertTimeout);
            clearTimeout(timer);
        };
    }, [updateAlert]);

    const alertStyles = {
        [ALertEnum.DANGER]: {
            ring: "ring-red-500",
            bg: "bg-red-100",
            ICon: CgDanger,
            text: "text-red-500",
        },
        [ALertEnum.INFO]: {
            ring: "ring-blue-500",
            bg: "bg-blue-100",
            ICon: CgInfo,
            text: "text-blue-500",
        },
        [ALertEnum.SUCCESS]: {
            ring: "ring-green-500",
            bg: "bg-green-100",
            ICon: CgCheckO,
            text: "text-green-500",
        },
        [ALertEnum.LOADING]: {
            ring: "ring-blue-500",
            bg: "bg-blue-100",
            ICon: AiOutlineLoading3Quarters,
            text: "text-blue-500",
        },
    };

    const { ring, bg, ICon, text } = alertStyles[type];

    return (
        <div>
            <div
                className={`fixed bottom-10 right-5 w-96 ring-2 ${ring} text-black flex items-center place-content-center h-14 rounded-md transition-all  ${bg} px-2 gap-2 transition-all duration-700 ${
                    !open
                        ? "translate-y-5 opacity-0"
                        : "translate-y-0 opacity-100"
                }`}
            >
                <ICon
                    className={`${
                        type === ALertEnum.LOADING ? "animate-spin" : ""
                    } ${text} `}
                />
                <h1 className=" w-full text-sm">{message}</h1>
            </div>
        </div>
    );
}
