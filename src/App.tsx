import './App.css'
import { Header } from './components/header'
import Hero from './components/hero'
import { OurStory } from './components/our-story'
import { Services } from './components/services'
import { Review } from './components/review'

function App() {

  return (
    <>
      <Header />
      <Hero />
      <OurStory />
      <Services />
      <Review />
    </>
  )
}

export default App
