export const getPrompts = async () => {
    const res = await fetch("/prompt");
    return res.json();
}