import { PageState } from "../layouts/Page"
import { useState } from "react"
import { useDidMount } from "./useDidMount"

const usePageLoad = (loadTime: number = 1000) => {
  const [pageState, setPageState] = useState<PageState>("loading")

  useDidMount(() => {
    const timeout = setTimeout(() => setPageState("ready"), loadTime)
    return () => clearTimeout(timeout)
  })

  return [pageState, setPageState] as const
}

export { usePageLoad }
