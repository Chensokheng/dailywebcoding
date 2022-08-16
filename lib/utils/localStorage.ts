export const setLocal = (key: string, value: any) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};

export const readLocal = (key: string) => {
    if (typeof window !== "undefined") {
        try {
            return JSON.parse(window.localStorage.getItem(key) as string);
        } catch {
            return window.localStorage.getItem(key);
        }
    }
};

export const removeAllKey = (key?: string) => {
    if (typeof window !== "undefined" && !key) {
        window.localStorage.clear();
    } else if (typeof window !== "undefined" && key) {
        window.localStorage.removeItem(key);
    }
};
