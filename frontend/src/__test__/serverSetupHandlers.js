import { rest } from "msw"
import { v4 as uuidv4 } from "uuid"

const serverRequestHandlers = [
    rest.post('http://localhost:3001/api/todos', (req, res, ctx) => {
    return res(
        ctx.status(201),
        ctx.set("Content-Type", "application/json; charset=utf-8"),
        ctx.json({"id": uuidv4(), "text": req.body.text, "completed":false, "_id": uuidv4()})
        )
  }),
  rest.get('http://localhost:3001/api/todos', (req, res, ctx) => {
      return res(
          ctx.status(200),
          ctx.set("Content-Type", "application/json; charset=utf-8"),
          ctx.json([{_id: uuidv4(), id: uuidv4(), text: "Incomplete Task", completed: false}])
          )
  }),
  rest.put('http://localhost:3001/api/todos/:id', (req, res, ctx) => {
      return res(
          ctx.status(200),
          ctx.set("Content-Type", "application/json; charset=utf-8"),
          ctx.json()
          )
  }),
]

export default serverRequestHandlers