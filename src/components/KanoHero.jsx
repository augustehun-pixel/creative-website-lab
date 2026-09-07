import KanoNav from './KanoNav.jsx'
import Tomato from './Tomato.jsx'
import Potato from './Potato.jsx'
import Carrot from './Carrot.jsx'
import Corn from './Corn.jsx'
import Eggplant from './Eggplant.jsx'
import './KanoHero.css'

const LEFT_LINES = ['GOOD', 'VEGETABLES', 'BRIGHTER', 'DAYS']
const RIGHT_LINES = ['FRESH', 'LOCAL', 'SEASONAL', 'FOR A HAPPIER YOU']

// Small labeled specimens, not equal-sized icons: each has its own scale,
// tilt and vertical offset (set in CSS) so the row reads as a loosely
// gathered collection rather than an aligned UI grid.
const LINEUP = [
  { Graphic: Tomato, name: 'TOMATO', modifier: 'tomato' },
  { Graphic: Potato, name: 'POTATO', modifier: 'potato' },
  { Graphic: Carrot, name: 'CARROT', modifier: 'carrot' },
  { Graphic: Corn, name: 'CORN', modifier: 'corn' },
  { Graphic: Eggplant, name: 'EGGPLANT', modifier: 'eggplant' },
]

function KanoHero() {
  return (
    <header className="kano-hero">
      <KanoNav />

      <div className="kano-hero__main">
        <ul className="kano-hero__side kano-hero__side--left">
          {LEFT_LINES.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <div className="kano-hero__centerpiece">
          <div className="kano-hero__mark">
            <Tomato className="kano-hero__tomato" />
            <h1 className="kano-hero__wordmark" aria-label="KANO">
              <span className="kano-hero__letter kano-hero__letter--k" aria-hidden="true">K</span>
              <span className="kano-hero__letter kano-hero__letter--a" aria-hidden="true">A</span>
              <span className="kano-hero__letter kano-hero__letter--n" aria-hidden="true">N</span>
              <span className="kano-hero__letter kano-hero__letter--o" aria-hidden="true">O</span>
            </h1>
          </div>

          <div className="kano-hero__market" aria-hidden="true">
            <p className="kano-hero__market-label">VEGETABLE MARKET</p>
            <div className="kano-hero__market-stripes">
              <span className="kano-hero__market-stripe kano-hero__market-stripe--blue" />
              <span className="kano-hero__market-stripe kano-hero__market-stripe--red" />
              <span className="kano-hero__market-stripe kano-hero__market-stripe--yellow" />
              <span className="kano-hero__market-stripe kano-hero__market-stripe--orange" />
            </div>
          </div>
        </div>

        <ul className="kano-hero__side kano-hero__side--right">
          {RIGHT_LINES.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <ul className="kano-hero__lineup">
        {LINEUP.map(({ Graphic, name, modifier }) => (
          <li className={`kano-hero__item kano-hero__item--${modifier}`} key={name}>
            <Graphic className={`kano-hero__item-graphic kano-hero__item-graphic--${modifier}`} />
            <span className="kano-hero__item-label">{name}</span>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default KanoHero
