// ESmodule => import/export
import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

// UUID => Unique Universal ID

// 3 formas do front enviar informacoes

// Query Parameters: URL Stateful => Filtros, paginacao, nao-obrigatorios e sem dados sensiveis
// Route Parameters: Identificacao de recurso
// Request Body: Envio de informacoes de formulario (HTTPs)

// http://localhost:3333/users?userID=1&name=Diego
// GET http://localhost:3333/users/1
// POST http://localhost:3333/users

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
});

server.listen(3333)