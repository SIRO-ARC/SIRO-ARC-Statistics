import { toPng } from "html-to-image";

export const exportURL = () => {
    const url = window.location.href; // current full URL

    navigator.clipboard.writeText(url)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link."));
};

export const exportImage = async (containerRef: React.RefObject<HTMLDivElement | null>, title: string) => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    const originalOverflow = element.style.overflow;
    const originalWidth = element.style.width;
    const originalBgSize = element.style.backgroundSize;
    const originalBgRepeat = element.style.backgroundRepeat;

    try {
        element.style.overflow = "visible";
        element.style.width = "3000px";

        element.style.backgroundSize = "auto";
        element.style.backgroundRepeat = "repeat";
        element.style.backgroundPosition = "left";

        const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });

        const link = document.createElement("a");
        link.download = `${title}-talent-tree.png`;
        link.href = dataUrl;
        link.click();
    } finally {
        element.style.overflow = originalOverflow;
        element.style.width = originalWidth;
        element.style.backgroundSize = originalBgSize;
        element.style.backgroundRepeat = originalBgRepeat;
    }
};