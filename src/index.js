import express from 'express'
import routes from './routes.js'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}))
app.use(express.json())

app.use('/api', routes)

const PORT = 3000

app.listen(PORT, () => {
  console.log('Runing http://localhost:' + PORT)
})

export default app
