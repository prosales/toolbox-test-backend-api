export function csvToJson (content) {
  const lines = content.split('\n')
  const result = []
  const headers = lines[0].split(',')
  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const currentline = lines[i].split(',')
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    delete obj.file
    result.push(obj)
  }
  return result.filter((record) => {
    return Object.values(record).every(
      (value) => value !== null && value !== undefined && value !== ''
    )
  })
}

export function cleanRecords (records) {
  return records.filter((item) => {
    return item !== undefined && item.lines.length > 0
  })
}

export function filteredRecords (records, fileName) {
  return records.filter((item) => {
    return item.file.toLowerCase().includes(fileName.toLowerCase())
  })
}
