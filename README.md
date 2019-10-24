# blipblop

A fast way to create CRUD APIs based on Sequelize and Express

## Design

### Rationale
Most applications that requires database always rely on having a model. After writing the model, it needs to be hooked to an HTTP Server.
Then it needs to be hooked to some routes and other things that slows down development since other things are needed before you can
send requests to get data.

Therefore writing a library that automatically handles the HTTP Server, routing and others can be beneficial for devs that only needs write
prototypes.

### Example
```ts
class User {
    username: string;
    password: string;
}
const crud = new Blipblop();
const UserCRUD = crud.addModel({model: User, prefix: "/"});
express.use(crud);
```
