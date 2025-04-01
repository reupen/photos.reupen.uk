import "swiped-events"

const { previousPath, nextPath, returnPath } = document.documentElement.dataset

const navigatePrevious = () => {
  if (previousPath) {
    window.location.href = previousPath
  }
}

const navigateNext = () => {
  if (nextPath) {
    window.location.href = nextPath
  }
}

const navigateUp = () => {
  if (returnPath) {
    window.location.href = returnPath
  }
}
const fullscreenPicture = document.getElementById("fullscreen-picture")
const standalonePicture = document.querySelector<HTMLElement>(
  "#standalone-picture img",
)

if (standalonePicture && fullscreenPicture?.requestFullscreen) {
  standalonePicture.style.cursor = "pointer"
  standalonePicture.title = "View fullscreen"
  standalonePicture.addEventListener("click", () => {
    fullscreenPicture.requestFullscreen().catch(() => undefined)
  })
}

fullscreenPicture?.addEventListener("click", () => {
  document.exitFullscreen().catch(() => undefined)
})

const fullScreenButton = document.getElementById("fullscreen-link")
fullScreenButton?.removeAttribute("hidden")

fullScreenButton?.addEventListener("click", () => {
  document
    .getElementById("fullscreen-picture")
    ?.requestFullscreen()
    .catch(() => undefined)
})

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    screen.orientation?.lock("landscape").catch(() => undefined)
  } else {
    screen.orientation?.unlock()
  }
})

document.addEventListener("swiped-right", navigatePrevious)

document.addEventListener("swiped-left", navigateNext)

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  switch (event.key) {
    default:
      return
    case "ArrowLeft":
      navigatePrevious()
      break
    case "ArrowRight":
      navigateNext()
      break
    case "Escape":
      navigateUp()
      break
  }

  event.preventDefault()
})
