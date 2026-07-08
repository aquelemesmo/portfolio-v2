import {useCallback, useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

export type ModalPage =
    | {
        type: "media";
        src: string;
        alt: string;
    }
    | {
        type: "link";
        src: string;
        label: string;
    };

type ModalProps = {
    pages: ModalPage[];
    onClose: () => void;
}

export default function ProjectModal({pages, onClose}: ModalProps) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const currentPage = pages[current] || pages[0];
    const hasMultiplePages = pages.length > 1;

    const isVideo = (src: string) => {
        return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg");
    }

    const isVerticalVideo = (src: string) => {
        return isVideo(src) && src.includes("/vertical/");
    }

    const getUrl = (src: string) => {
        try {
            return new URL(src);
        } catch {
            return null;
        }
    }

    const getYouTubeVideoId = (url: URL) => {
        const pathParts = url.pathname.split("/").filter(Boolean);

        if (pathParts[0] === "shorts" && pathParts[1]) {
            return pathParts[1];
        }

        if (url.hostname === "youtu.be") {
            return pathParts[0] || null;
        }

        return url.searchParams.get("v");
    }

    const getTikTokVideoId = (url: URL) => {
        const pathParts = url.pathname.split("/").filter(Boolean);
        const videoIndex = pathParts.indexOf("video");

        return videoIndex >= 0 ? pathParts[videoIndex + 1] : null;
    }

    const isVerticalLink = (src: string) => {
        const url = getUrl(src);

        if (!url) return false;

        const pathParts = url.pathname.split("/").filter(Boolean);
        const isInstagram = url.hostname.includes("instagram.com");
        const isTikTok = url.hostname.includes("tiktok.com");
        const isYouTubeShort = url.hostname.includes("youtube.com") && pathParts[0] === "shorts";

        return (isInstagram && ["p", "reel", "tv"].includes(pathParts[0])) || isTikTok || isYouTubeShort;
    }

    const getEmbedUrl = (src: string) => {
        const url = getUrl(src);

        if (!url) return null;

        const pathParts = url.pathname.split("/").filter(Boolean);
        const isYouTube = url.hostname.includes("youtube.com") || url.hostname === "youtu.be";
        const isInstagram = url.hostname.includes("instagram.com");
        const isTikTok = url.hostname.includes("tiktok.com");

        if (isYouTube) {
            const videoId = getYouTubeVideoId(url);
            return videoId ? `https://www.youtube.com/embed/${videoId}` : src;
        }

        if (isTikTok) {
            const videoId = getTikTokVideoId(url);
            return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : null;
        }

        if (isInstagram) {
            const [contentType, contentId] = pathParts;
            const canEmbedInstagramContent = ["p", "reel", "tv"].includes(contentType);

            return canEmbedInstagramContent && contentId
                ? `https://www.instagram.com/${contentType}/${contentId}/embed/`
                : null;
        }

        return src;
    }

    const next = useCallback(() => {
        if (pages.length === 0) return;

        setDirection(1);
        setCurrent((prev) => (prev + 1) % pages.length);
    }, [pages.length]);

    const prev = useCallback(() => {
        if (pages.length === 0) return;

        setDirection(-1);
        setCurrent((prev) => (prev - 1 + pages.length) % pages.length);
    }, [pages.length]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            else if (e.key === "ArrowLeft") prev();
            else if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("keydown", handleKey);
        }
    }, [next, onClose, prev]);

    if (!currentPage) return null;

    const currentEmbedUrl = currentPage.type === "link" ? getEmbedUrl(currentPage.src) : null;
    const isVerticalPage = currentPage.type === "media"
        ? isVerticalVideo(currentPage.src)
        : isVerticalLink(currentPage.src);
    const modalFrameClass = isVerticalPage
        ? "w-full max-w-[min(90vw,420px)] max-h-[90vh] aspect-[9/16] flex items-center justify-center"
        : "w-full h-auto max-h-[90vh] aspect-video sm:max-w-2xl md:max-w-4xl lg:max-w-6xl flex items-center justify-center";

    return (
        <AnimatePresence>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8">
                <button type="button" aria-label="Close modal" onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-white text-2xl sm:text-3xl md:text-4xl hover:text-red-600 hover:scale-125 transition hover:cursor-pointer">
                    &times;
                </button>

                {hasMultiplePages && (
                    <button type="button" aria-label="Previous media" onClick={prev} className="absolute left-2 sm:left-4 md:left-10 text-white text-2xl sm:text-3xl md:text-4xl hover:scale-125 transition hover:cursor-pointer z-10">
                        &lt;
                    </button>
                )}

                <div className={modalFrameClass}>
                    <AnimatePresence mode="wait">
                        {currentPage.type === "link" ? (
                            <motion.div
                                key={current}
                                className="relative w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl overflow-hidden bg-neutral-950"
                                initial={{ opacity: 0, x: direction * 100, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: direction * -100, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                {currentEmbedUrl ? (
                                    <>
                                        <iframe
                                            src={currentEmbedUrl}
                                            title={currentPage.label}
                                            loading="lazy"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="h-full w-full border-0 bg-white"
                                        />
                                        <a href={currentPage.src} target="_blank" rel="noreferrer" className="absolute bottom-3 right-3 rounded-full border border-[#61DAFB] bg-black/80 px-3 py-2 text-sm text-[#61DAFB] transition-all duration-300 hover:bg-[#61DAFB] hover:text-white">
                                            Open page
                                        </a>
                                    </>
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
                                        <p className="text-lg font-medium text-white">{currentPage.label}</p>
                                        <a href={currentPage.src} target="_blank" rel="noreferrer" className="rounded-full border border-[#61DAFB] px-4 py-2 text-sm text-[#61DAFB] transition-all duration-300 hover:bg-[#61DAFB] hover:text-white">
                                            Open page
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        ) : isVideo(currentPage.src)? (
                            <motion.video
                                key={current}
                                src={currentPage.src}
                                autoPlay
                                loop
                                muted
                                controls
                                playsInline
                                className="w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl object-cover"
                                initial={{ opacity: 0, x: direction * 100, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: direction * -100, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            />
                        ) : (
                            <motion.img
                                key={current}
                                src={currentPage.src}
                                alt={currentPage.alt}
                                className="w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl object-cover"
                                initial={{ opacity: 0, x: direction * 100, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: direction * -100, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {hasMultiplePages && (
                    <button type="button" aria-label="Next media" onClick={next} className="absolute right-2 sm:right-4 md:right-10 text-white text-2xl sm:text-3xl md:text-4xl hover:scale-125 transition hover:cursor-pointer z-10">
                        &gt;
                    </button>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
