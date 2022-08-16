import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
    return (
        <div className="bg-primary w-full h-99 flex justify-center items-center">
            <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
        </div>
    );
}
