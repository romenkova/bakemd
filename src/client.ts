// Loaded after index.css so the site's own tokens win. See lib/vite.js.
import "virtual:bakemd-code-theme.css"
import "virtual:bakemd-theme.css"

const html = document.documentElement

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  const dark = html.classList.toggle("dark")
  html.classList.toggle("light", !dark)
  localStorage.setItem("theme", dark ? "dark" : "light")
})

const drawer = document.querySelector<HTMLDialogElement>("dialog[data-drawer]")
if (drawer) {
  document
    .querySelector("[data-drawer-open]")
    ?.addEventListener("click", () => drawer.showModal())
  // Children fill the dialog, so a click landing on the dialog itself is on
  // the backdrop.
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) drawer.close()
  })
}

function flash(el: HTMLElement) {
  el.dataset.copied = ""
  setTimeout(() => delete el.dataset.copied, 1000)
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement
  const button = target.closest<HTMLElement>('[aria-label="Copy code"]')
  const code = button?.parentElement?.querySelector("code")
  if (!button || !code) return
  navigator.clipboard?.writeText(code.textContent ?? "")
  flash(button)
})
