interface Grouped<T> {
  [key: string]: T[]
}

const groupBy = <T>(arr: T[], groupFn: (k: T) => string): Grouped<T> => {
  return arr.reduce((acc, val) => {
    acc[groupFn(val)] = acc[groupFn(val)] || []
    acc[groupFn(val)].push(val)
    return acc
  }, {} as Grouped<T>)
}

export { groupBy }
