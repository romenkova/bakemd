import { createContext, useContext } from "react"

export const BaseContext = createContext("")

/** Prefix for root-relative links. Empty when the site is served from `/`. */
export function useBase() {
  return useContext(BaseContext)
}
