export function getFileName(path: string): string {
    const fileNameWithExt = path.split(/[\\/]/).pop() || "Unknown Title";
    return fileNameWithExt.replace(/\.[^/.]+$/, "") || "Unknown Title";
}