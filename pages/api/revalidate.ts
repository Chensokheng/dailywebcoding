export default async function handler(req: any, res: any) {
    if (req.body.id !== process.env.SECRET) {
        return res.status(401).json({ message: "Invalid token" });
    }
    try {
        const paths = req.body.paths as string[];
        const promises = [] as Promise<any>[];
        paths.map((path) => {
            promises.push(res.revalidate(path));
        });
        Promise.all(promises).then(() => {
            return res.json({ revalidated: true });
        });
    } catch (err) {
        return res.status(500).send("Error revalidating");
    }
}
