const { v4: generateId } = require('uuid');
const database = require('./database');

const getTodos = async (req, res) => {
    
    if(!req.query.hasOwnProperty("offset") || !req.query.hasOwnProperty("limit")) {
        res.status(400);
        res.json({ message: "Bad Request, offset and limit query values are required" });
        return;
    }

    const { offset, limit } = req.query
    const query = {}

    if(req.query.hasOwnProperty("due_date")) {
        const { due_date } = req.query

        if (typeof due_date !== 'string') {
          res.status(400);
          res.json({ message: "invalid 'due_date' expected string" });
          return;
        }

        query.due_date = due_date
    }

    const todos = database.client.db('todos').collection('todos');
    const response = await todos.find(query).sort( { priority: -1 } ).skip(parseInt(offset))
    .limit(parseInt(limit)).toArray();
    
    res.status(200);
    res.json(response);
}

const postTodo = async (req, res) => {
    const { text } = req.body;
  
    if (typeof text !== 'string') {
      res.status(400);
      res.json({ message: "invalid 'text' expected string" });
      return;
    }
  
    const todo = { id: generateId(), text, completed: false, priority: 1 };
    await database.client.db('todos').collection('todos').insertOne(todo);
    res.status(201);
    res.json(todo);
}

const updateTodo = async (req, res) => {

    const { id } = req.params;

    if(typeof id !== 'number' && typeof id !== 'string') {
      res.status(400);
      res.json({ message: "Bad Request: TodoID is Required"});
      return;
    }
    
    if(req.body.hasOwnProperty('priority')) {
      const { priority } = req.body;

      if (typeof priority !== 'number') {
        res.status(400);
        res.json({ message: "invalid 'priority' expected number"});
        return;
  
      }
  
      await database.client.db('todos').collection('todos').updateOne({ id },
          { $set: { priority : priority }  });
        const response = await todos.find().sort( { priority: -1 } ).skip(parseInt(0))
        .limit(parseInt(20)).toArray();
        res.status(200);
        res.json(response)
        res.end();
    }
  
    if(req.body.hasOwnProperty('completed')) {
      const { completed } = req.body;
      if (typeof completed !== 'boolean') {
        res.status(400);
        res.json({ message: "invalid 'completed' expected boolean" });
        return;

      } else {

        await database.client.db('todos').collection('todos').updateOne({ id },
          { $set: { completed }  });
        res.status(200);
        res.json({message: "Todo Completion Status Updated"})
        res.end();
      }
  }

  if(req.body.hasOwnProperty('due_date')) {
    const { due_date } = req.body;

    if (typeof due_date !== 'string') {
      res.status(400);
      res.json({ message: "invalid 'due_date' expected string" });
      return;

    } else {

      await database.client.db('todos').collection('todos').updateOne({ id },
        { $set: { due_date }  });
      res.status(200);
      res.json({message: "Due Date Updated"})
      res.end();
    }
}

      res.status(400);
      res.json({ message: "Bad Request" });
      return;
    
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    //add validation here to check if todo with provided ID exists

    await database.client.db('todos').collection('todos').deleteOne({ id });
    res.status(203);
    res.end();
  }


module.exports = {
    getTodos,
    postTodo,
    updateTodo,
    deleteTodo,
}  