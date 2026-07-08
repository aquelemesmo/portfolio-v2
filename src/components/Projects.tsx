import type {ProjectType} from "../types/ProjectType.tsx";
import {useState} from "react";
import ProjectModal, {type ModalPage} from "./Modal.tsx";

const projects: ProjectType[] = [
    {category: "Minecraft Server", title: "ComplexoCraft", image: "/png/project/complexocraft.png", gifs: ["/gif/project/complexocraft/gif-1.gif", "/gif/project/complexocraft/gif-2.gif", "/gif/project/complexocraft/gif-3.gif", "/gif/project/complexocraft/gif-4.gif"]},
    {category: "Minecraft Server", title: "RedeSoul", image: "/png/project/redesoul.png", gifs: ["/gif/project/redesoul/gif-1.gif", "/gif/project/redesoul/gif-2.gif", "/gif/project/redesoul/gif-3.gif", "/gif/project/redesoul/gif-4.gif", "/gif/project/redesoul/gif-5.gif", "/gif/project/redesoul/gif-6.gif"]},
    {category: "Minecraft Server", title: "RedeInsanos", image: "/png/project/redeinsanos.png", gifs: ["/gif/project/redeinsanos/gif-1.gif", "/gif/project/redeinsanos/gif-2.gif", "/gif/project/redeinsanos/gif-3.gif", "/gif/project/redeinsanos/gif-4.gif", "/gif/project/redeinsanos/gif-5.gif", "/gif/project/redeinsanos/gif-6.gif"]},
    {category: "Minecraft Server", title: "BedWars", image: "/png/project/bedwars.png", media: ["/png/project/video/bedwars.mp4"]},
    {category: "Minecraft Server", title: "CandySMP", image: "/png/project/candysmp.png", media: ["/png/project/video/candysmp1.mp4", "/png/project/video/candysmp2.mp4", "/png/project/video/candysmp3.mp4", "/png/project/video/candysmp4.mp4", "/png/project/video/candysmp5.mp4", "/png/project/video/candysmp6.mp4"]},
    {category: "Video Editor", title: "EcoStudios", image: "/png/project/ecostudios.png", links: ["https://www.instagram.com/reel/DaX4kS0xUiu/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==", "https://www.instagram.com/reel/DaVhc1Wxg5_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", "https://www.instagram.com/reel/DaNyIf9xb-i/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", "https://www.instagram.com/reel/DaLWgIRRE02/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", "https://www.instagram.com/reel/DaIoc72x4HC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="]},
    {category: "Video Editor", title: "TheKingJohn_", image: "/png/project/thekingjohn1.png", links: ["https://www.youtube.com/watch?v=oAlt1H-wLVY", "https://www.youtube.com/watch?v=u0k1n-BupHM&t=5s", "https://www.youtube.com/watch?v=CGbjLkFPtJQ&t=167s"]},
    {category: "Video Editor", title: "WesleyJK", image: "/png/project/wesleyjk.png", links: ["https://www.youtube.com/watch?v=6k5eDs-2oII&t=28s", "https://www.youtube.com/watch?v=6bBmpillb7s"]},
    {category: "Video Editor", title: "aquelejack", image: "/png/project/aquelejack.png", links: ["https://www.youtube.com/watch?v=oThDQroSEkY&t=1s", "https://youtu.be/Q8MZkn9G9wo?si=WXCg5dPmM7wZV0Xc", "https://youtu.be/lMK_fyApFMg?si=cfVhbq_oVuQF_VNL", "https://youtu.be/MKD16TvAwco?si=ASSrkUgNGqVpTvmL", "https://youtu.be/xUjSEDPwLf8?si=8zXGXQAL6Z0jRG3X", "https://youtu.be/9hUp6xEqnK8?si=NAcPTBPsp4cWx5ih", "https://youtu.be/s8I_pBxwwhY?si=dX25znrK7sEWK9Jc", "https://youtu.be/wPKMW5A1_HE?si=ofoRCFs0HaVOD77j", "https://youtu.be/wl8BN-ijE_c?si=c8GPQhwoUJ34jS9K", "https://youtu.be/tqSpokeO3pU?si=-4CpHcblZ-ZfYVqa", "https://youtu.be/yDDvpygbfeA?si=O4vX2TIbHlh62hhX", "https://youtu.be/12x0f9i1J8M?si=Z1jb7f4OAN1PLYaS"]},
    {category: "Website (Front-End)", title: "Color Gradient", image: "/png/project/color-gradient.png", links: ["https://color-gradient-eight.vercel.app/"]},
]

type Props = {
    activeCategory: string;
}

export default function Projects({activeCategory}: Props) {
    const [selectedPages, setSelectedPages] = useState<ModalPage[] | null>(null);

    const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

    const getProjectMedia = (project: ProjectType) => [...(project.gifs || []), ...(project.media || [])];
    const getProjectPages = (project: ProjectType): ModalPage[] => [
        ...getProjectMedia(project).map((src) => ({
            type: "media" as const,
            src,
            alt: `${project.title} project media`,
        })),
        ...(project.links || []).map((src, index) => ({
            type: "link" as const,
            src,
            label: `${project.title} page ${index + 1}`,
        })),
    ];

    return (
        <>
            <div className="bg-white/5 rounded-2xl max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
                {filteredProjects.map((project) => {
                    const projectPages = getProjectPages(project);

                    return (
                        <div key={project.title} className="flex flex-col items-center text-center">
                            <img src={project.image} alt={`${project.title} project preview`} className="rounded-2xl p-2 w-full max-w-xs" />
                            <div className="my-4 md:my-8 flex flex-wrap justify-center gap-2 px-2">
                                {projectPages.length > 0 && (
                                    <button type="button" onClick={() => setSelectedPages(projectPages)} className="border p-1 md:p-2 rounded-full transition-all duration-400 border-[#61DAFB] text-[#61DAFB] hover:bg-[#61DAFB] hover:text-white text-sm md:text-base hover:cursor-pointer">
                                        View project
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {selectedPages && (<ProjectModal pages={selectedPages} onClose={() => setSelectedPages(null)}/>)}
        </>
    );
}
