import express from 'express'
import { prismaClient } from './database'

const app = express()
app.use(express.json())

const port = process.env.PORT ?? 4000

app.get('/books', async (request, response) => {
  const books = await prismaClient.book.findMany()
  return response.json(books)
})

app.post('/books', async (request, response) => {
  const { description, name } = request.body
  console.log(description, name)
  
  return response.json(description, name)
})

app.listen(port, () => console.log('Server is running on port ', port))
