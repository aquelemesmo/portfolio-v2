import {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

type ModalProps = {
    media: string[];
    onClose:() => void;
}

export default function ProjectModal({media, onClose}: ModalProps) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const isVideo = (src: string) => {
        return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg");
    }

    const next = () => {
        setDirection(1)
        setCurrent((prev) => (prev + 1) % media.length);
    }

    const prev = () => {
        setDirection(-1)
        setCurrent((prev) => (prev - 1 + media.length) % media.length);
    }

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
    }, [])

    return (
        <AnimatePresence>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8">
                <
                    button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-white text-2xl sm:text-3xl md:text-4xl hover:text-red-600 hover:scale-125 transition hover:cursor-pointer">
                    ✕
                </button>

                <button onClick={prev} className="absolute left-2 sm:left-4 md:left-10 text-white text-2xl sm:text-3xl md:text-4xl hover:scale-125 transition hover:cursor-pointer z-10">
                    ‹
                </button>

                <div className="w-full h-auto max-h-[90vh] aspect-video sm:max-w-2xl md:max-w-4xl lg:max-w-6xl flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isVideo(media[current])? (
                            <motion.video
                                key={current}
                                src={media[current]}
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
                                src={media[current]}
                                className="w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl object-cover"
                                initial={{ opacity: 0, x: direction * 100, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: direction * -100, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <button onClick={next} className="absolute right-2 sm:right-4 md:right-10 text-white text-2xl sm:text-3xl md:text-4xl hover:scale-125 transition hover:cursor-pointer z-10">
                    ›
                </button>
            </motion.div>
        </AnimatePresence>
    )
}