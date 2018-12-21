export function guidGenerator() {
    const s =  () => {
        return (((1 + Math.random()) * 0x10000) | 0)
            .toString(16)
            .substring(1);
    };
    return (s() + s() + "-" + s() + "-" + s() + "-" + s() + "-" + s() + s() + s());
}