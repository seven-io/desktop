export const toMegaBytes = (bytes: number): string => {
    const mb = (bytes / (1024 * 1024)).toFixed(2);

    return `${mb} MB`;
};
