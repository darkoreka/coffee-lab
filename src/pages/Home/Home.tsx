import { Header } from "../../components/header"
import Hero from "./components/hero"
import { OurStory } from "./components/our-story"
import { Review } from "../Reviews/components/review"
import { Services } from "./components/services"
import Footer from "../../components/footer"

function Home() {

    return (
        <>
            <Header />
            <Hero />
            <OurStory />
            <Services />
            <Review />
            <Footer />
        </>
    )
}

export default Home
