import express from 'express'
import { prismaClient } from './database'
import cors from "cors";


const app = express()
app.use(express.json())
const clientURL = "*";

// CORS options
const corsOptions = {
  origin: clientURL,
};
app.use(cors(corsOptions));

const port = process.env.PORT ?? 4000

app.get('/books', async (request, response) => {
  const books = await prismaClient.book.findMany()
  return response.json(books)
})

app.post('/books', async (request, response) => {
  const { description, name } = request.body
  const book = await prismaClient.book.create({
    data: {
      description,
      name,
    },
  })
  return response.json(book)
})

app.listen(port, () => console.log('Server is running on port ', port))
