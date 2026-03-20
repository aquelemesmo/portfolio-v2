import Header from "./components/Header.tsx";
import {Snowfall} from "react-snowfall";
import Container from "./components/Container.tsx";

export default function App() {
  return (
    <>
        <Snowfall snowflakeCount={15}/>
        <Header/>
        <Container/>
    </>
  )
}
