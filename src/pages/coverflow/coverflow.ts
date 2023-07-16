import { animate, scroll } from "motion"

interface Cover {
  src: string
  title: string
  artist: string
}

type Axis = "x" | "y"

const zip = <X, Y>(xs: X[], ys: Y[]): [X, Y][] => xs.map((x, i) => [x, ys[i]])

const setup = ($container: HTMLDivElement, covers: Cover[]) => {
  for (const cover of covers) {
    const $wrapper = document.createElement("div")
    const $img = document.createElement("img")
    $img.src = cover.src
    $img.className = "cover-img"

    $wrapper.className = "cover-wrapper"
    $wrapper.appendChild($img)
    $container.appendChild($wrapper)
  }

  const $meta = document.createElement("div")
  const $title = document.createElement("span")
  const $artist = document.createElement("span")
  const $home = document.createElement("a")

  $title.innerText = "A Moon Shaped Pool"
  $artist.innerText = "Radiohead"
  $home.innerText = "←"

  $meta.id = "meta"
  $title.id = "meta-title"
  $artist.id = "meta-artist"
  $home.id = "meta-home"

  $home.href = "/"
  $meta.appendChild($title)
  $meta.appendChild($artist)
  $meta.appendChild($home)
  $container.appendChild($meta)
}

const logistic = (midpoint: number, steepness: number) => (x: number) =>
  -1 + 2 / (1 + Math.exp(-steepness * (x - midpoint)))

const bell = (midpoint: number, steepness: number) => (x: number) =>
  Math.exp(-steepness * (x - midpoint) ** 2)

const coverflow = ($root: HTMLDivElement, covers: Cover[], axis: Axis) => {
  $root.innerHTML = `
    <div id="covers">
    </div>
  `
  const $container = document.querySelector<HTMLDivElement>("#covers")!
  $container.classList.add(`axis-${axis}`)
  setup($container, covers)

  const width = axis === "x" ? window.innerWidth / 4 : window.innerHeight / 3

  const $images = $container.querySelectorAll<HTMLImageElement>(".cover-img")
  const $wrappers =
    $container.querySelectorAll<HTMLDivElement>(".cover-wrapper")

  const $covers = zip(Array.from($images), Array.from($wrappers))

  const $title = document.querySelector("#meta-title")!
  const $artist = document.querySelector("#meta-artist")!

  for (const [i, [$image, $wrapper]] of $covers.entries()) {
    $image.width = width
    $image.height = width
    $image.style.width = `${width}px`

    $wrapper.style.margin =
      axis === "x" ? `0 ${-0.25 * width}px` : `${-0.25 * width}px 0`

    scroll(
      animate($wrapper, {
        zIndex: ["1", "100", "1"],
      }),
      {
        container: $container,
        target: $wrapper,
        offset: [0, 1],
        axis,
      }
    )

    scroll(
      ({ x, y }) => {
        const progress = axis === "x" ? x.progress : y.progress
        const rotate =
          60 * -logistic(0.5, 10)(progress) * (axis === "x" ? 1 : -1)
        const t = 200 * bell(0.5, 1000)(progress)
        const translate = 0.5 * width * logistic(0.5, 20)(progress)

        $image.style.transform = `translateZ(${t}px) translate${
          axis === "x" ? "X" : "Y"
        }(${translate}px) rotate${axis === "x" ? "Y" : "X"}(${rotate}deg)`

        if (0.4 <= progress && progress <= 0.6) {
          $title.innerHTML = covers[i].title
          $artist.innerHTML = covers[i].artist
        }
      },
      { container: $container, target: $image, axis }
    )
  }

  axis === "x"
    ? $container.scrollBy(
        $container.scrollWidth / 2 - $container.clientWidth / 2,
        0
      )
    : $container.scrollBy(
        0,
        $container.scrollHeight / 2 - $container.clientHeight / 2
      )
}

export { coverflow }
