import './CastNav.css'

export default function CastNav({ bagCount, onOpenBag }) {
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
      {/* opens the Bag drawer — a real button, not a link, since it doesn't
          navigate anywhere; matches the semantic fix from Audit #1 */}
      <button type="button" className="cast-nav__bag" onClick={onOpenBag} aria-label={`Bag, ${bagCount} items`}>
        Bag
        <span className={`cast-nav__count ${bagCount > 0 ? 'is-active' : ''}`}>{bagCount}</span>
      </button>
    </header>
  )
}
