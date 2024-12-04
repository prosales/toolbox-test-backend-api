import { Router } from 'express'
import axios from 'axios'
import {
  TOKEN,
  API_FILES,
  API_FILE
} from './helpers/constants.js'
import {
  csvToJson,
  cleanRecords,
  filteredRecords
} from './helpers/functions.js'

const router = Router()

const config = {
  headers: { Authorization: `Bearer ${TOKEN}` }
}

router.get('/files/data', async (req, res) => {
  try {
    const params = req.query
    const response = await axios.get(API_FILES, config)
    if (response.status === 200) {
      const apiPromises = response.data.files.map(async (element) => {
        try {
          const fileResponse = await axios.get(API_FILE + element, config)
          if (fileResponse.status === 200) {
            return {
              file: element,
              lines: csvToJson(fileResponse.data)
            }
          }
        } catch { }
      })

      const results = await Promise.all(apiPromises)
      const cleanResults = cleanRecords(results)
      if (params.fileName) {
        return res.json(filteredRecords(cleanResults, params.fileName))
      }
      return res.json(cleanResults)
    }
  } catch (error) {
    return res.status(400).json({
      message: 'Error al obtener datos de la API externa'
    })
  }
})

router.get('/files/list', async (req, res) => {
  try {
    const response = await axios.get(API_FILES, config)
    if (response.status === 200) {
      return res.json({
        success: true,
        data: response.data
      })
    }

    return res.json({
      success: false,
      data: []
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener datos de la API externa'
    })
  }
})

export default router
