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
  const { description, name } = request.body;

// Verificar se já existe um livro com o mesmo nome e descrição
const existingBook = await prismaClient.book.findFirst({
  where: {
    name: { equals: name }, 
    description: { equals: description }, 
  },
});

// Se já existir um livro com os mesmos valores, retornar um erro
if (existingBook) {
  return response.status(400).json({ error: 'Já existe um livro com o mesmo nome e descrição.' });
}

// Se não existir, criar o novo livro
const book = await prismaClient.book.create({
  data: {
    description,
    name,
  },
});

return response.json(book);

})

app.listen(port, () => console.log('Server is running on port ', port))
