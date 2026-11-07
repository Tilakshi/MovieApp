import popcornLogo from '../assets/popcorn-logo.svg'

function Navbar(){
    return (
        <header className="border-b border-cream/300 bg-charcoal text-cream">
<nav
  aria-label="Main navigation"
  className="flex w-full flex-wrap items-center gap-6 px-6 py-5"
>                <a href="/">
                    <img src={popcornLogo} className="h-20 w-auto"/>
                </a>

                <div className="flex items-center gap-5 text-sm font-semibold">
                    <a href="/" aria-current="page" className="border-b-2 border-peach py-2 text-peach">
                        Discover
                    </a>

                    <a href="#movies" className="py-2 hover:text-peach">Movies</a>
                </div>

                <input type="search" aria-label="Search movies" placeholder="Search..." className="order-last w-full rounded-lg border border-cream/30
                     bg-cream/10 px-4 py-2 text-sm text-cream
                     placeholder:text-cream/60 focus:outline-2
                     focus:outline-offset-2 focus:outline-peach
                     md:order-none md:ml-auto md:w-64"/>
                
                <button type="button" className="ml-auto cursor-pointer rounded-lg bg-burnt-orange
                     px-4 py-2 text-sm font-semibold text-cream
                     hover:brightness-110 focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-peach
                     md:ml-0">Watchlist</button>
                    
                
            </nav>
        </header>

    )
}

export default Navbar