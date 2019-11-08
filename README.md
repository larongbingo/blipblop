# blipblop

A fast way to create CRUD APIs based on Sequelize and Express

## Design

### Notes
Most applications that requires database always rely on having a model. After writing the model, it needs to be hooked to an HTTP Server.
Then it needs to be hooked to some routes and other things that slows down development since other things are needed before you can
send requests to get data.

Therefore writing a library that automatically handles the HTTP Server, routing and others can be beneficial for devs that only needs write
prototypes. The point of this library is to automate the creation of the CRUD APIs needed for each model.

This library would only be providing the Router Middleware for Express.

```ts
class Book {
    title: string;
    description: string;
}
const crud = new Blipblop();
const BookCrud = crud.addModel({model: Books, prefix: "/"});
express.use("/apis", crud);
```

Once a model has been added, each has 4 properties that relates to the CRUD operations. They are named "create", "read", "update" and "delete"

Each CRUD Operations could be whitelisted based on your needs. In the example below, the Book CRUD operations is only allowed to use read.
```ts
class Book {
    title: string;
    description: string;
}
const crud = new Blipblop();
const BookCrud = crud.addModel({model: Books, prefix: "/", allowedCRUDOperations: ["read"]});
express.use(crud);
```

To allow for preprocessing of requests before running the Sequelize Commands, a simple lifecycle would be included. They are named "beforeProc" and "afterProc".
```ts
...
const BookCrud = crud.addModel({model: Books, prefix: "/"});
BookCrud.create.beforeProc(req => {
    if(!isValidSession(req.headers["Authorization"])) {
        throw new Error();
    }
});
```

However, you might need to use multiple preprocessing, so beforeProc and afterProc allows for queuing of functions.
```ts
...
const BookCrud = crud.addModel({model: Books, prefix: "/"});
BookCrud.create.beforeProc(async req => {
    if(!isValidSession(req.headers["Authorization"])) 
        throw new Error();
    else 
        req.user = await getUserDetails(req.headers["Authorization"]));
});
BookCrud.create.beforeProc(req => {
    if(!isUserValid(req.user)) {
        throw new Error();
    }
});
```
