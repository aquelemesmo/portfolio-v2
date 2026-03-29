import {useEffect, useState} from "react";

export default function Header() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 200)
    }, [])

    return (
        <>
            <div className="relative w-full h-full">
                <div className="relative z-10 flex flex-col items-center justify-center h-screen gap-10">

                    <h1 className={`font-[Arial] font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white object-cover transform transition-all duration-1000 ${show ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}>Welcome to<br/> my portfolio</h1>
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
                        <a href="#projects" onClick={() => {document.getElementById("projects")?.scrollIntoView({behavior: "smooth"})}} className={`text-white mt-2 md:mt-4 border-2 border-white rounded-full p-2 md:p-3 transform transition-all duration-1000 hover:duration-300 hover:cursor-pointer hover:bg-white hover:text-black ${show ? "translate-x-0 opacity-100" : "translate-y-20 opacity-0"}`}>Click to see my projects</a>
                        <a className={`text-white mt-2 md:mt-4 border-2 border-white rounded-full p-2 md:p-3 transform transition-all duration-1000 hover:duration-300 hover:cursor-pointer hover:bg-white hover:text-black ${show ? "translate-x-0 opacity-100" : "translate-y-20 opacity-0"}`}>Contact with me</a>
                    </div>
                </div>
            </div>
        </>
    )
}