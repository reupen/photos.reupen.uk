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

function fullscreenify(standaloneId: string, fullscreenId: string) {
  const fullscreenPicture = document.getElementById(fullscreenId)
  const standalonePicture = document.querySelector<HTMLElement>(
    `#${standaloneId} img`,
  )

  if (standalonePicture && fullscreenPicture?.requestFullscreen) {
    standalonePicture.style.cursor = "pointer"
    standalonePicture.title = "View fullscreen"
    standalonePicture.addEventListener("click", () => {
      fullscreenPicture.style.display = "block"
      fullscreenPicture.requestFullscreen().catch(() => undefined)
    })
  }

  fullscreenPicture?.addEventListener("click", () => {
    document.exitFullscreen().catch(() => undefined)
  })
}

fullscreenify("standalone-sdr-picture", "fullscreen-sdr-picture")
fullscreenify("standalone-hdr-picture", "fullscreen-hdr-picture")

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
