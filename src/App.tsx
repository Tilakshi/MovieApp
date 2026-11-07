import Navbar from './components/navbar'
import Hero from './components/Hero'
import MovieBrowser from './components/MovieBrowser'

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <MovieBrowser />
      </main>
    </>
  )
}

export default App