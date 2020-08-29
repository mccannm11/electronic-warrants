const $ = {
  sleep: (timeout: number) =>
    new Promise((res, rej) => {
      setTimeout(res, timeout)
    })
} as const

export { $ }
