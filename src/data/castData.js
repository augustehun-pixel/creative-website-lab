// LOOP — a fictional handmade-silver-ring brand built for this design lab.
// Every character below is a personality; every personality wears one
// original ring. All names, rings, prices, and stories are prototype
// content invented for this study — not a real brand, not for sale, and
// not copied from any reference site's copy, products, or branding.
//
// `accessory: 'none'` keeps CastFace's face-jewelry slot empty on purpose —
// the character illustration and the product photo are two separate
// systems now (see ProductImage.jsx): CastFace/RingGlyph stay in the BRAND
// WORLD (illustration, storytelling), while `images` below is the PRODUCT
// WORLD slot — real photography paths once they exist. Every slot is
// `null` today (no real photos yet), which renders an honestly-labeled
// placeholder instead of a fake photorealistic ring. Drop a real image
// path into any slot later and that spot starts showing a real photo with
// no other code changes.
const CAST = [
  {
    id: 'moss',
    name: 'Moss',
    species: 'human',
    hair: 'sweep',
    accessory: 'none',
    mood: 'calm',
    ringName: 'Still Band',
    ringType: 'band',
    motif: 'plain rounded band',
    finish: 'polished sterling silver',
    images: { hero: null, angle: null, detail: null, worn: null, lifestyle: null },
    price: 68,
    story: 'quiet and sure — the ring for someone who doesn’t need to say much.',
    sizes: [5, 6, 7, 8, 9],
  },
  {
    id: 'wren',
    name: 'Wren',
    species: 'human',
    hair: 'center',
    accessory: 'none',
    mood: 'sharp',
    ringName: 'Vantage',
    ringType: 'signet',
    motif: 'flat signet face, single engraved line',
    finish: 'oxidized sterling silver',
    images: { hero: null, angle: null, detail: null, worn: null, lifestyle: null },
    price: 128,
    story: 'watches the room before she enters it — a flat signet face with one fine engraved line.',
    sizes: [5, 6, 7, 8, 9],
  },
  {
    id: 'arlo',
    name: 'Arlo',
    species: 'human',
    hair: 'curl',
    accessory: 'none',
    mood: 'dreamy',
    ringName: 'Driftline',
    ringType: 'twist',
    motif: 'open, softly twisted band',
    finish: 'polished sterling silver',
    images: { hero: null, angle: null, detail: null, worn: null, lifestyle: null },
    price: 89,
    story: 'always somewhere between here and a daydream — a softly twisted band.',
    sizes: [5, 6, 7, 8, 9],
  },
  {
    id: 'pip',
    name: 'Pip',
    species: 'dog',
    hair: 'floppy',
    accessory: 'none',
    mood: 'eager',
    ringName: 'First Knock',
    ringType: 'stack',
    motif: 'two thin bands, crossed and stacked',
    finish: 'brushed sterling silver',
    images: { hero: null, angle: null, detail: null, worn: null, lifestyle: null },
    price: 76,
    story: 'first through the door, every time — two thin bands stacked to move as one.',
    sizes: [5, 6, 7, 8, 9],
  },
  {
    id: 'juno',
    name: 'Juno',
    species: 'cat',
    hair: 'sleek',
    accessory: 'none',
    mood: 'unbothered',
    ringName: 'Low Light',
    ringType: 'hammered',
    motif: 'hand-hammered, faceted surface',
    finish: 'matte sterling silver',
    images: { hero: null, angle: null, detail: null, worn: null, lifestyle: null },
    price: 72,
    story: 'moves like nothing is urgent, because nothing is — a hand-hammered, no-shine surface.',
    sizes: [5, 6, 7, 8, 9],
  },
  {
    id: 'baz',
    name: 'Baz',
    species: 'tiger',
    hair: 'stripe',
    accessory: 'none',
    mood: 'bold',
    ringName: 'Loudline',
    ringType: 'engraved',
    // PILOT PRODUCT — real photo (public/IMG_0940.jpeg) replaces the
    // fictional placeholder for `hero`. The motif/story clauses below are
    // updated to match what the real ring actually is (a wide band with
    // dense engraved script in an oxidized recess), not a redesign — the
    // ring type, finish, price, and personality all stayed the same
    // because they already fit.
    motif: 'wide band, dense engraved script in an oxidized recess',
    finish: 'oxidized sterling silver',
    images: { hero: '/IMG_0940.jpeg', angle: null, detail: null, worn: null, lifestyle: null },
    price: 118,
    story: 'wears attention like it’s nothing new — a wide band engraved edge to edge, no blank space left on it.',
    sizes: [5, 6, 7, 8, 9],
  },
  {
    id: 'remy',
    name: 'Remy',
    species: 'horse',
    hair: 'mane',
    accessory: 'none',
    mood: 'gentle',
    ringName: 'Long Field',
    ringType: 'wide',
    motif: 'wide, elongated oval band',
    finish: 'brushed sterling silver',
    images: { hero: null, angle: null, detail: null, worn: null, lifestyle: null },
    price: 95,
    story: 'gentle, but you feel him coming — a wide, unhurried band.',
    sizes: [5, 6, 7, 8, 9],
  },
  {
    id: 'sable',
    name: 'Sable',
    species: 'snake',
    hair: 'coil',
    accessory: 'none',
    mood: 'sly',
    ringName: 'Coilback',
    ringType: 'coil',
    motif: 'tapered wraparound coil',
    finish: 'polished sterling silver',
    images: { hero: null, angle: null, detail: null, worn: null, lifestyle: null },
    price: 148,
    story: 'never in a hurry, never where you left it — a band that wraps the finger like a coil.',
    sizes: [5, 6, 7, 8, 9],
  },
]

// The single source of truth for "is this a real, buyable product yet?" —
// every card/row/modal checks this instead of re-deriving it, so dropping a
// real photo into a ring's `images.hero` later is the only change needed to
// flip that ring from COMING SOON to a full real-product card everywhere.
export function hasRealPhoto(ring) {
  return Boolean(ring.images?.hero)
}

export default CAST
