export default function revalidateCache(id: string, paths: string[]) {
    return fetch("/api/revalidate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, paths }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}
