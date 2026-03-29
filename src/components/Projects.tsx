import type {ProjectType} from "../types/ProjectType.tsx";
import {useState} from "react";
import ProjectModal from "./Modal.tsx";

const project: ProjectType[] = [
    {category: "Minecraft Server", title: "ComplexoCraft", image: "/png/project/complexocraft.png", gifs: ["/gif/project/complexocraft/gif-1.gif", "/gif/project/complexocraft/gif-2.gif", "/gif/project/complexocraft/gif-3.gif", "/gif/project/complexocraft/gif-4.gif"]},
    {category: "Minecraft Server", title: "RedeSoul", image: "/png/project/redesoul.png", gifs: ["/gif/project/redesoul/gif-1.gif", "/gif/project/redesoul/gif-2.gif", "/gif/project/redesoul/gif-3.gif", "/gif/project/redesoul/gif-4.gif", "/gif/project/redesoul/gif-5.gif", "/gif/project/redesoul/gif-6.gif"]},
    {category: "Minecraft Server", title: "RedeInsanos", image: "/png/project/redeinsanos.png", gifs: ["/gif/project/redeinsanos/gif-1.gif", "/gif/project/redeinsanos/gif-2.gif", "/gif/project/redeinsanos/gif-3.gif", "/gif/project/redeinsanos/gif-4.gif", "/gif/project/redeinsanos/gif-5.gif", "/gif/project/redeinsanos/gif-6.gif"]},
]

type Props = {
    activeCategory: string;
}

export default function Projects({activeCategory}: Props) {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    const filteredProjects = activeCategory === "All" ? project : project.filter(p => p.category === activeCategory);

    return (
        <>
            <div className="bg-white/5 rounded-2xl max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
                {filteredProjects.map((project, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                        <img src={project.image} className="rounded-2xl p-2 w-full max-w-xs" />
                        <div className="my-4 md:my-8">
                            <a onClick={() => setSelectedProject(project)} href={project.link} className="border p-1 md:p-2 rounded-full transition-all duration-400 border-[#61DAFB] text-[#61DAFB] hover:bg-[#61DAFB] hover:text-white text-sm md:text-base hover:cursor-pointer">Access project here</a>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProject && (<ProjectModal gifs={selectedProject.gifs} onClose={() => setSelectedProject(null)}/>)}
        </>
    );
}