import {useEffect, useState} from "react";
import LightPillar from "../interface/LightPillar.tsx";

export default function Header() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 200)
    }, [])

    return (
        <>
            <div className="relative w-full h-full overflow-hidden">
                <div style={{ width: '100%', height: '100%' }} className="absolute overflow-hidden inset-0 z-0 pointer-events-none">
                    <LightPillar
                        topColor="#0057ff"
                        bottomColor="#00d1ff"
                        intensity={1}
                        rotationSpeed={0.5}
                        glowAmount={0.002}
                        pillarWidth={2.8}
                        pillarHeight={0.4}
                        noiseIntensity={0.5}
                        pillarRotation={25}
                        interactive={false}
                        mixBlendMode="screen"
                        quality="high"
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-screen gap-10">
                    <div className="flex flex-row-reverse items-center gap-20">
                        <img src="/png/eu_ai.png" className={`rounded-full w-64 h-64 object-cover transform transition-all duration-1000 ${show ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}/>

                        <h1 className={`font-[Arial] font-bold text-7xl text-white object-cover transform transition-all duration-1000 ${show ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}>Welcome to<br/> my portfolio</h1>
                    </div>
                    <div className="flex flex-row items-center gap-10">
                        <a className={`text-white mt-4 border-2 border-white rounded-full p-3 transform transition-all duration-1000 hover:duration-300 hover:bg-white hover:text-black ${show ? "translate-x-0 opacity-100" : "translate-y-20 opacity-0"}`}>Click to see my projects</a>
                        <a className={`text-white mt-4 border-2 border-white rounded-full p-3 transform transition-all duration-1000 hover:duration-300 hover:bg-white hover:text-black ${show ? "translate-x-0 opacity-100" : "translate-y-20 opacity-0"}`}>Contact with me</a>
                    </div>
                </div>
            </div>
        </>
    )
}