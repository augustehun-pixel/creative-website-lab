# creative-website-lab

This repository is a lab for practicing how to build visually strong, interactive
websites from reference material — images, products, characters, packaging,
illustrations, and mood boards. It is a separate project from stock-dashboard
and any other repo; nothing here should touch files outside this directory.

## Project Rules

1. **Preserve the user's visual intent above all else.** Whatever the user is
   trying to achieve visually is the top priority — technical convenience never
   overrides it.

2. **Before coding from a reference image, analyze it first.** Cover:
   - overall mood
   - color palette
   - typography
   - layout
   - shapes
   - visual hierarchy
   - image placement
   - motion/animation opportunities
   - interaction ideas

   (전체 분석 프레임워크와 레퍼런스 유형별 접근은 아래 "Design Philosophy" 섹션 참고.)

3. **Do not copy a reference image pixel-for-pixel.** Use it as inspiration and
   translate its visual language into an original website — not a clone.
   (타 브랜드 로고/캐릭터/제품명 등 저작물 원본 복제 금지 원칙은 아래
   "Reference & Copyright Principle" 참고.)

4. **Prefer bold, memorable, editorial, playful, or immersive design** over
   generic SaaS-style layouts — as the default when nothing else is
   specified. 사용자가 명확히 minimal/quiet/professional/luxury/serious/
   utilitarian/data-dense 등 다른 방향을 요구하거나 레퍼런스 자체가 그런
   성격을 강하게 가지고 있다면, 그 의도(user intent + reference character)가
   이 기본 스타일 선호보다 우선한다.

5. **Avoid unnecessary dashboards, cards, gradients, glassmorphism, and
   generic AI-looking UI** unless the reference clearly calls for them.

6. **Keep the implementation simple enough for learning**, but never sacrifice
   visual quality to do so.

7. **Prefer React + Vite** for the frontend unless there's a strong reason not to.

8. **Prefer CSS and lightweight JavaScript interactions** before reaching for
   large animation libraries.

9. **If animation is needed, keep it smooth, purposeful, and responsive.**

10. **Mobile and tablet layouts must be considered from the beginning**, not
    bolted on at the end. (구체적인 breakpoint 기준은 아래 "Responsive Design
    Framework" 참고.)

11. **Do not add a backend, database, authentication, or API** unless the
    project actually needs one.

12. **Explain reasoning briefly before making major visual decisions.**

13. **레퍼런스 분석과 사용자 승인은 별개다.** 사용자가 레퍼런스와 함께
    "만들어줘/구현해줘/수정해줘"처럼 작업을 명확히 요청했다면, 필요한
    분석은 내부적으로 수행하고 바로 구현한다 — 분석 보고 후 승인을
    기다리는 단계를 별도로 만들지 않는다. 사용자의 의도가 결과물을 크게
    바꿀 정도로 불명확한 경우에만 구현 전에 질문한다. (clear intent →
    내부 분석 → 구현 / ambiguous critical intent → 질문. 사용자가 전문
    용어 없이 "이런 느낌"이라고만 말해도 괜찮다 — 그 감각을 분석 가능한
    디자인 언어로 번역하는 것이 Claude의 역할이다. 아래 "Core Principle"
    참고.)

14. **Do not modify files outside this repository.**

15. **After meaningful changes, run basic checks and summarize what changed.**
    (viewport별 확인 체크리스트는 아래 "Visual Verification" 참고.)

16. **Never commit secrets, API keys, tokens, or private credentials.**

17. **Keep the project structure clean and easy to understand for a beginner.**

## Learning Style

- The user is learning Claude Code — explain things so a 12-year-old could
  follow along.
- Avoid unnecessary jargon. If a technical term is needed, explain it in one
  simple phrase.
- When a command or architectural choice matters, briefly explain *why* it's
  being used, not just what it does.

## Design Philosophy

이 섹션은 "Project Rules"를 대체하지 않는다. Project Rules가 지켜야 할
규칙이라면, 이 섹션은 그 규칙을 실제로 어떻게 적용할지에 대한 상세한
사고 과정과 프레임워크다. 두 섹션이 겹치는 부분은 위쪽 Project Rules에서
아래로 pointer를 남겨두었다.

### 프로젝트의 목적

이 프로젝트의 목적은 특정 디자인을 복제하는 것이 아니다.

사용자는 전문 웹디자이너/개발자가 아니므로 디자인 전문용어나 구현 기술을
정확히 설명하지 못할 수 있다. 사용자는 Pinterest, Instagram, 웹사이트,
포스터, 패키지, 제품 사진, 그림, 일러스트 등에서 "이런 느낌이 좋다",
"이걸 웹사이트로 만들고 싶다", "이 부분이 마음에 든다"처럼 시각적인
방향을 제시한다.

Claude의 역할은 사용자가 제공한 레퍼런스를 분석해서
**무엇을 읽어낼지 → 어떤 디자인 원리가 숨어 있는지 → 그것을 어떻게
웹으로 변환할지 → 어떻게 움직이고 반응하게 할지 → 실제 코드로 어떻게
구현할지**까지 연결하는 것이다. (Rule 1, 12, 13과 직결)

### 기본 제작 과정

```
REFERENCE → ANALYZE → UNDERSTAND → TRANSLATE → DESIGN → INTERACT → IMPLEMENT → VERIFY
```

이 흐름은 Claude 내부의 사고 과정 기준이지, 매 단계를 사용자에게
보고하거나 단계마다 승인을 받아야 한다는 뜻이 아니다. 사용자 의도가
명확하면 ANALYZE~INTERACT는 내부적으로 거치고 바로 구현한다 (Rule 13
참고). 문서 내 다른 곳의 작업 흐름(Core Principle, Iterative Workflow)은
모두 이 흐름을 기준으로 한다.

### 세 가지 Reference Mode

레퍼런스를 받으면 먼저 아래 세 가지 중 어떤 방식인지 판단한다.

**MODE A — Web Reference**: 이미 완성된 웹사이트/웹 디자인 참고
(Pinterest 웹디자인, 실제 웹사이트, 랜딩페이지, 포트폴리오, UI 스크린샷 등).
레이아웃, hero 구성, 섹션 순서, 크기, 간격, 정렬, typography, color
palette, image placement, navigation, cards, buttons, whitespace, visual
hierarchy, scrolling, hover, transition, animation, responsive behavior를
분석한다. 목표는 픽셀 복사가 아니라 사용자가 좋아하는 구조·분위기·비율·
경험을 정확히 파악해 현재 프로젝트에 맞게 재구성하는 것이다. 완성도 높은
웹 레퍼런스가 있다면 그 장점을 잃지 않도록 불필요하게 모든 것을 새로
발명하지 않는다.

**MODE B — Visual Inspiration**: 웹사이트가 아닌 시각 자료(포스터, 패키지,
음식, 음료, 제품, 사진, 일러스트, 어린이 그림, 책 표지, 간판, 잡지, 오브젝트
등)로 새 웹사이트를 만드는 경우. 이미지를 그대로 웹페이지처럼 복사하지
않는다. 먼저 이미지의 **Design DNA**를 추출한다.

- COLOR: main / secondary / accent, contrast, color ratio, gradient
- SHAPE: circles, rectangles, irregular geometry, border thickness, rounded
  shapes, repeated forms
- TYPOGRAPHY: weight, size, roundness, slant, spacing, placement,
  hand-drawn qualities
- MOTIF: fruit, stars, waves, ribbons, flowers, characters, patterns,
  repeated decoration
- COMPOSITION: whitespace, density, asymmetry, central composition,
  repetition, scale contrast, overlap
- MOOD: cute, playful, intentionally awkward, premium, retro, futuristic,
  natural, experimental

그다음 이 특징을 웹 디자인 언어로 번역한다. 예: 패키지의 둥근 프레임 →
card/button/image container, 반복되는 과일 → background motif/floating
object, 불규칙한 그림 → SVG illustration, 강한 색상 대비 → section color
transition, 손글씨 느낌 → headline treatment, 패키지 장식 →
navigation/divider/icon. 원본 이미지를 그대로 붙이는 것이 아니라, 그
이미지가 가진 디자인 규칙과 세계관을 새로운 웹 경험으로 확장한다.

**MODE C — Hybrid Reference**: 여러 레퍼런스의 장점을 조합하는 경우
(예: A→layout/composition, B→color/typography, C→shape/motif,
D→interaction/animation). 각 레퍼런스가 어떤 역할을 맡을지 먼저 구분하고
하나의 일관된 디자인 시스템으로 통합한다. 여러 디자인을 단순히 섞어놓은
것처럼 보여서는 안 된다.

### Reference Analysis Framework

새 레퍼런스를 받았다고 바로 코딩하지 않는다. 먼저 내부적으로 판단한다:

1. 무엇이 가장 먼저 눈에 들어오는가?
2. 왜 이 디자인이 기억에 남는가?
3. 핵심 색상은 무엇인가?
4. 특징적인 형태는 무엇인가?
5. typography의 성격은 무엇인가?
6. whitespace와 density는 어떤가?
7. 반복되는 motif가 있는가?
8. 무엇을 웹 UI로 번역할 수 있는가?
9. 어떤 요소가 움직이면 재미있을까?
10. 사용자가 이 레퍼런스에서 좋아할 가능성이 높은 핵심은 무엇인가?

"귀엽다", "레트로하다", "예쁘다" 정도로 분석을 끝내지 않는다. 구현
가능한 디자인 변수로 번역한다. 예: "귀엽고 하찮다" → imperfect
proportions / asymmetry / awkward posture / simplified geometry /
unexpected small movements.

### User Intent Translation

사용자의 자연어 피드백을 중요한 디자인 데이터로 취급하고, 전문 용어가
없어도 디자인 변수로 번역한다.

- "너무 작아" → scale 증가
- "너무 커" → scale 감소
- "조금 더 하찮게" → asymmetry / imperfect proportion / awkwardness 증가
- "화면을 더 채워줘" → visual occupancy 증가 / whitespace 감소
- "너무 정돈되어 있어" → controlled irregularity / asymmetry 증가
- "간격만 줄여줘" → spacing 변수만 변경, 나머지 승인된 디자인은 보존
- "이전 게 더 좋아" / "방금 변경 전으로 돌려줘" → 새로운 디자인 요청이
  아니라 되돌리기(revert) 요청으로 해석한다. 가능하면 직전 변경만
  되돌리고, 그 이전에 잘 작동하던 디자인과 기능은 그대로 유지한다.

작은 수정 요청은 항상 요청받은 변수만 바꾸고 나머지는 그대로 둔다 —
전체 디자인을 다시 만들지 않는다.

### Controlled Creative Freedom

사용자가 명확히 지정한 부분과 Claude가 상상할 수 있는 부분을 구분한다.

- **KEEP**: 사용자가 좋아한다고 명확히 말한 특징, 핵심 색상, 핵심 형태,
  중요한 layout, 중요한 mood, 이미 승인된 요소.
- **EXPLORE**: interaction, micro-interaction, hover reaction, scroll
  animation, section transition, 작은 캐릭터 행동, easter eggs,
  storytelling, 아직 정의되지 않은 section.

핵심 디자인은 지키고, 비어 있는 공간에서 창의성을 사용한다.

### Interaction

결과물은 정적인 포스터에 그치지 않는다. 필요하면 hover, click, drag,
scroll, floating, bounce, rotation, parallax, reveal, scale, cursor
reaction, section transition, background transition, micro-interaction을
적극 검토한다 (Rule 9와 직결). 단, 애니메이션 개수 자체가 목표가 아니다.
모든 움직임은 사이트의 세계관과 사용자 경험에 이유가 있어야 한다.

### Motif Expansion

레퍼런스에서 발견한 특징적인 형태/motif는 필요하면 사이트 전체의 디자인
언어로 확장한다 (hero, button, card, badge, navigation, background,
divider, cursor, loading animation, icon, decoration 등). 사이트 전체가
하나의 세계처럼 느껴져야 한다.

### Design System

구현 전에 COLOR / TYPOGRAPHY / SHAPE / SPACING / MOTION을 내부적으로
정리한다. 각 요소는 페이지마다 무작위로 바꾸지 말고 사이트 전체에서
일관된 디자인 언어를 유지한다.

### Responsive Design Framework

Desktop만 맞추지 않는다. 최소한 다음 환경을 고려한다:

- Desktop: 약 1440px
- Tablet landscape: 약 1024–1366px
- Tablet portrait: 약 768–1024px
- Mobile: 약 390–430px

단순히 전체 페이지를 축소하는 방식으로 대응하지 않는다. 필요하면 요소
재배치, scale 변경, spacing 변경, navigation 변경, animation 강도 변경,
composition 변경을 사용한다.

### Implementation Approach

SVG / CSS / JavaScript는 목적에 맞게 선택한다 (Rule 7, 8과 직결).

- **SVG**: irregular shapes, characters, fruit, icons, decorative
  graphics, hand-drawn forms
- **CSS**: layout, background, gradient, simple shapes, hover, transition
- **JavaScript**: interaction, scroll behavior, state, dynamic animation

기술 자체보다 원하는 시각적 결과와 경험을 우선한다.

### Iterative Workflow

첫 결과를 완성본으로 생각하지 않는다. 위 "기본 제작 과정"의 마지막 단계
(IMPLEMENT → VERIFY)를 사용자 피드백을 받아가며 반복한다:
VIEW → USER FEEDBACK → ADJUST → VERIFY → (필요하면 다시 반복).

작은 수정 요청 때문에 이미 잘 만들어진 전체 페이지를 불필요하게
재작성하지 않는다. 기존 사이트가 있다면 먼저 현재 구조를 읽고, 좋은
부분은 유지하고 필요한 부분만 수정한다 (변수 단위 수정/되돌리기 기준은
위 "User Intent Translation" 참고).

사용자가 이미 전체 구현을 명확히 요청했다면, 한 섹션만 만들어두고
불필요하게 멈추거나 승인을 기다리지 않는다 — 전체를 구현한 뒤 이 반복
루프로 다듬는다.

### Visual Verification

코드를 작성했다고 작업이 끝난 것이 아니다. 가능하면 다음 viewport에서
실제 브라우저 결과를 확인한다: 1440px, 1024px, 768px, 390px.

확인 항목: clipping, overlap, excessive whitespace, element scale, visual
balance, navigation, animation, scrolling, responsive layout. 레퍼런스가
있다면 구현 결과와 다시 비교한다.

### Reference & Copyright Principle

레퍼런스에서 color, shape, composition, mood, typography characteristics,
interaction ideas 등 **디자인 원리**를 분석하고 재해석하는 것은 괜찮다.
하지만 타 브랜드의 logo, character, product name, proprietary artwork
등을 그대로 복제하는 것을 기본 방식으로 삼지 않는다. 필요하면 특징을
추출해 오리지널 요소로 재해석한다.

### Core Principle

사용자는 전문 디자이너가 아니어도 된다. 사용자는 "이게 좋다", "이건
싫다", "이런 느낌이 좋다", "이걸 웹으로 만들어보고 싶다"처럼 방향을
제시할 수 있다. Claude의 역할은 그 감각을 위 "기본 제작 과정"
(REFERENCE → ANALYZE → UNDERSTAND → TRANSLATE → DESIGN → INTERACT →
IMPLEMENT → VERIFY)을 따라 실제 코드로 연결하는 것이다. 목표는 단순히
예쁜 웹사이트를 만드는 것이 아니라, 사용자가
머릿속으로만 생각했던 것을 실제로 보고, 움직이고, 만지고, 경험할 수 있는
웹사이트로 만드는 것이다.
