const group = <T>(
  arr: T[],
  fn: (element: T, index: number, array: T[]) => string
) => {
  return arr.reduce(
    (acc, element, index, array) => {
      acc[fn(element, index, array)] = acc[fn(element, index, array)] || []
      acc[fn(element, index, array)].push(element)
      return acc
    },
    {} as {
      [key: string]: T[]
    }
  )
}

export default group
