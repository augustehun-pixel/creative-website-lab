import './CastNav.css'

export default function CastNav({ bagCount }) {
  return (
    <header className="cast-nav">
      <a href="#top" className="cast-nav__mark">
        LOOP
      </a>
      <nav className="cast-nav__links">
        <a href="#cast">The Loop</a>
        <a href="#shop">Shop</a>
        <a href="#story">About</a>
      </nav>
      <a href="#shop" className="cast-nav__bag" aria-label={`Bag, ${bagCount} items`}>
        Bag
        <span className={`cast-nav__count ${bagCount > 0 ? 'is-active' : ''}`}>{bagCount}</span>
      </a>
    </header>
  )
}
