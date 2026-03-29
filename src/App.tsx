import Header from "./components/Header.tsx";
import {Snowfall} from "react-snowfall";
import Container from "./components/Container.tsx";
import ColorBends from "./interface/ColorBends.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  return (
    <>
        <div style={{ width: '100%', height: '100%' }} className="blur-y absolute overflow-hidden inset-0 z-0 pointer-events-none">
            <ColorBends
                colors={["#004bdc", "#0080ff", "#00b2ff"]}
                rotation={0}
                speed={0.2}
                scale={1}
                frequency={1}
                warpStrength={1}
                mouseInfluence={1}
                parallax={0.5}
                noise={0.1}
                transparent
                autoRotate={0}
            />
        </div>
        <Snowfall snowflakeCount={15} enable3DRotation={false}/>
        <Header/>
        <Container/>
        <Footer/>
    </>
  )
}
