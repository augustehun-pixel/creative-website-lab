import './KanoNav.css'

const LINKS = ['VEGETABLE', 'DRINK', 'BAKING', 'ABOUT']

// Deliberately quiet — small type, no background, no icons beyond the cart
// glyph — so it stays a supporting strip and never competes with the
// tomato/KANO graphic below it.
function KanoNav() {
  return (
    <nav className="kano-nav">
      <span className="kano-nav__logo">KANO</span>
      <ul className="kano-nav__links">
        {LINKS.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
      <button className="kano-nav__cart" type="button" aria-label="cart">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 8h12l-1.2 12H7.2L6 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      </button>
    </nav>
  )
}

export default KanoNav
