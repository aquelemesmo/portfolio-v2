import type {Badge} from "../types/BadgeType.tsx";
import Projects from "./Projects.tsx";
import {useState} from "react";

const badges: Badge[] = [
    {url: "https://img.shields.io/badge/HTML-20232A?style=for-the-badge&logo=html5&logoColor=61DAFB", width: 125, height: 100},
    {url: "https://img.shields.io/badge/CSS-20232A?style=for-the-badge&logo=css&logoColor=61DAFB", width: 117, height: 100},
    {url: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB", width: 134, height: 100},
    {url: "https://img.shields.io/badge/Next-20232A?style=for-the-badge&logo=nextdotjs&logoColor=61DAFB", width: 128, height: 100},
    {url: "https://img.shields.io/badge/TypeScript-20232A?style=for-the-badge&logo=typescript&logoColor=61DAFB", width: 186, height: 100},
    {url: "https://img.shields.io/badge/Tailwind_CSS-20232A?style=for-the-badge&logo=tailwind-css&logoColor=61DAFB", width: 200, height: 100},
    {url: "https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite&logoColor=61DAFB", width: 116, height: 100},
    {url: "https://img.shields.io/badge/MySQL-20232A?style=for-the-badge&logo=mysql&logoColor=61DAFB", width: 134, height: 100},
]

export default function Container() {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <>
            <div className="text-white text-center justify-center items-center">
                <section id="aboutme">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl m-8 md:m-16 lg:m-24 font-semibold ">About me</h1>

                    <div className="flex flex-col md:flex-row text-white px-4 md:px-8 lg:px-24 xl:px-96 gap-8 md:gap-12">
                        <img src="/png/eu_ai.png" className={`relative rounded-full w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover mx-auto md:mx-0`}/>

                        <p className="text-sm md:text-base lg:text-lg">My name is Lucas Gomes, I am 18 years old, and I was born in São Paulo, Brazil. I am a technology developer who began my journey in a self-taught way, exploring programming during my free time and transforming curiosity into solid knowledge.

                            Over time, I strengthened my skills through courses, technical education in IT, and I am currently deepening my studies in the field of Computer Science. I have experience in web application development, working on both front-end and back-end, using technologies such as HTML, CSS, JavaScript, React, and other modern tools to build functional interfaces and efficient digital experiences.

                            In addition, I have several years of experience developing Discord bots, creating customized solutions for communities of different sizes, always focusing on automation, performance, and system organization.

                            My goal is to build increasingly complete, scalable, and well-structured projects — not just writing code, but delivering solutions that truly create value.</p>
                    </div>
                </section>


                <section id="experiences">
                    <h1 className="text-white text-2xl md:text-3xl lg:text-4xl m-8 md:m-16 lg:m-24 font-semibold">My experiences</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-6 px-4">
                        {badges.map((badge, i) => {
                            return (
                                <div key={i}>
                                    <img src={badge.url} alt={`badge logo`} width={badge.width} height={80} className="object-contain flex-shrink-0 rounded-4xl p-2"/>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section id="projects">
                    <h1 className="text-white text-2xl md:text-3xl lg:text-4xl m-8 md:m-16 lg:m-24 font-semibold">My projects</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-6 mb-8 md:mb-12 px-4">
                        <button type="button" onClick={() => setActiveCategory("All")} className="text-fg-brand bg-neutral-primary border rounded-full transition-all duration-400 border-[#61DAFB] text-[#61DAFB] hover:bg-brand hover:bg-[#61DAFB] hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-base text-sm px-3 md:px-4 py-2 md:py-2.5 focus:outline-none">All</button>
                        <button type="button" onClick={() => setActiveCategory("Minecraft Server")} className="text-fg-brand bg-neutral-primary border rounded-full transition-all duration-400 border-[#61DAFB] text-[#61DAFB] hover:bg-brand hover:bg-[#61DAFB] hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-base text-sm px-3 md:px-4 py-2 md:py-2.5 focus:outline-none">Minecraft Server</button>
                        <button type="button" onClick={() => setActiveCategory("Website (Front-End)")} className="text-fg-brand bg-neutral-primary border rounded-full transition-all duration-400 border-[#61DAFB] text-[#61DAFB] hover:bg-brand hover:bg-[#61DAFB] hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-base text-sm px-3 md:px-4 py-2 md:py-2.5 focus:outline-none">Website (Front-End)</button>
                        <button type="button" onClick={() => setActiveCategory("Video Editor")} className="text-fg-brand bg-neutral-primary border rounded-full transition-all duration-400 border-[#61DAFB] text-[#61DAFB] hover:bg-brand hover:bg-[#61DAFB] hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-base text-sm px-3 md:px-4 py-2 md:py-2.5 focus:outline-none">Video Editor</button>
                        <button type="button" onClick={() => setActiveCategory("Discord Bot")} className="text-fg-brand bg-neutral-primary border rounded-full transition-all duration-400 border-[#61DAFB] text-[#61DAFB] hover:bg-brand hover:bg-[#61DAFB] hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-base text-sm px-3 md:px-4 py-2 md:py-2.5 focus:outline-none">Discord Bot</button>
                    </div>

                    <Projects activeCategory={activeCategory} />
                </section>
            </div>
        </>
    )
}