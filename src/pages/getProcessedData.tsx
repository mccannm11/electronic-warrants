import _ from "lodash"

const getWarrantsByDay = (records: WarrantRecord[]) => {
  const result: Record<string, any[]> = {}

  records.forEach((record) => {
    const dateString = record.Submitted.toDateString()

    if (!result[dateString]) {
      result[dateString] = [record]
    } else {
      result[dateString].push(record)
    }
  })

  return result
}

export type WarrantRecord = any

export type ProcessedData = {
  maxWarrantsPerDay: WarrantCount
  oldestDate: Date
  mostRecentDate: Date
  warrantCountByDay: WarrantCount[]
  allDatesDescending: Date[]
  warrantsByDay: Record<string, WarrantRecord>
  allCities: string[]
  warrantsByCity: Record<string, CityWarrantRecord>
  maxWarrantsOfCity: number
  allCitiesByWarrantCountDescending: string[]
  warrantsByNature: Record<string, NatureWarrantRecord>
  allNatures: string[]
  maxWarrantsOfNature: number
  allNaturesByWarrantCountDescending: string[]
  warrantsByDateGroupedByNature: Record<string, Record<string, number>>
  allNaturesIncludingOther: string[]
}

export type WarrantCount = {
  count: number
  date: Date
  dateString: string
}

type CityWarrantRecord = {
  count: number
  records: any
}

const getAllCities = (records: any[]) =>
  _.uniq(records.map((r) => r["County of Court"]))

const getMaxWarrantsOfCities = (
  warrantsByCity: Record<string, CityWarrantRecord>
) =>
  _.max(Object.keys(warrantsByCity).map((city) => warrantsByCity[city].count))

const getWarrantsByCity = (records: any[]) => {
  const uniqueCities = getAllCities(records)
  const result: Record<string, CityWarrantRecord> = {}

  for (let city of uniqueCities) {
    const recordsForCity = records.filter((r) => r["County of Court"] === city)
    result[city] = { count: recordsForCity.length, records: recordsForCity }
  }

  return result
}

const getAllCitiesByWarrantCountDescending = (
  warrantsByCity: Record<string, CityWarrantRecord>
) => {
  const allCities = Object.keys(warrantsByCity)
  return allCities.sort(
    (a, b) => warrantsByCity[b].count - warrantsByCity[a].count
  )
}

type NatureWarrantRecord = {
  count: number
  records: any[]
}

const getAllNatures = (records: any[]): string[] => {
  return records.map((r) => r["Primary Nature"])
}

const getWarrantsByNature = (
  records: any[]
): Record<string, NatureWarrantRecord> => {
  const allNatures = getAllNatures(records)

  const result = {}

  for (let nature of allNatures) {
    const allRecordsOfNature = records.filter(
      (r) => r["Primary Nature"] === nature
    )
    result[nature] = {
      count: allRecordsOfNature.length,
      records: allRecordsOfNature
    }
  }

  return result
}

const getMaxWarrantsOfNature = (
  warrantsByNature: Record<string, NatureWarrantRecord>
) => _.max(Object.keys(warrantsByNature).map((n) => warrantsByNature[n].count))

const getAllNaturesByWarrantCountDescending = (
  warrantsByNature: Record<string, NatureWarrantRecord>
) => {
  const allNatures = Object.keys(warrantsByNature)
  return allNatures
    .sort((a, b) => warrantsByNature[b].count - warrantsByNature[a].count)
    .filter((n) => warrantsByNature[n].count > 4)
}

const getWarrantsByDateGroupedByNature = (records: any[]) => {
  const warrantsByDay = getWarrantsByDay(records)

  const allDays = Object.keys(warrantsByDay)
  const result = {}

  for (const day of allDays) {
    const countsByNature = {}

    const warrantsByNature = getWarrantsByNature(records)
    const allNatures = getAllNaturesByWarrantCountDescending(warrantsByNature)

    for (const nature of allNatures) {
      const recordCount = warrantsByDay[day].filter(
        (r) => r["Primary Nature"] === nature
      ).length
      countsByNature[nature] = recordCount
    }

    const otherCount = warrantsByDay[day].filter(
      (r) => !allNatures.includes(r["Primary Nature"])
    ).length

    countsByNature["Other"] = otherCount

    result[day] = countsByNature
  }

  return result
}

export const getProcessedData = (records): ProcessedData => {
  const warrantsByDay = getWarrantsByDay(records)
  const allDates = Object.keys(warrantsByDay).map((date) => new Date(date))
  const allDatesDescending = allDates
    .slice()
    .sort((a, b) => a.getTime() - b.getTime())

  const warrantCountByDay: WarrantCount[] = allDatesDescending.map((date) => ({
    count: warrantsByDay[date.toDateString()].length,
    date: date,
    dateString: date.toDateString()
  }))

  const warrantsByCity = getWarrantsByCity(records)
  const allCities = getAllCities(records)
  const maxWarrantsOfCity = getMaxWarrantsOfCities(warrantsByCity)
  const allCitiesByWarrantCountDescending = getAllCitiesByWarrantCountDescending(
    warrantsByCity
  )
  const warrantsByNature = getWarrantsByNature(records)
  const allNatures = getAllNatures(records)
  const maxWarrantsOfNature = getMaxWarrantsOfNature(warrantsByNature)
  const allNaturesByWarrantCountDescending = getAllNaturesByWarrantCountDescending(
    warrantsByNature
  )
  const warrantsByDateGroupedByNature = getWarrantsByDateGroupedByNature(
    records
  )
  const allNaturesIncludingOther = Object.keys(warrantsByNature).filter(
    (n) => warrantsByNature[n].count > 4
  )

  const maxWarrantsPerDay = _.maxBy(warrantCountByDay, (day) => day.count)
  const oldestDate = _.head(allDatesDescending)
  const mostRecentDate = _.last(allDatesDescending)

  return {
    maxWarrantsPerDay,
    oldestDate,
    mostRecentDate,
    warrantCountByDay,
    allDatesDescending,
    warrantsByDay,
    allCities,
    warrantsByCity,
    maxWarrantsOfCity,
    allCitiesByWarrantCountDescending,
    warrantsByNature,
    allNatures,
    maxWarrantsOfNature,
    allNaturesByWarrantCountDescending,
    warrantsByDateGroupedByNature,
    allNaturesIncludingOther
  }
}
