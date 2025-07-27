import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import express from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

AppDataSource.initialize().then(async () => {
    const userRepo = AppDataSource.getRepository(User);

    app.get('/student', async (req, res) => {
        const users = await userRepo.find();
        res.send(users);
    });

    app.post('/student', async (req, res) => {
        const {firstName, lastName, age} = req.body;
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        
        try {
            const savedUser = await userRepo.save(user);
            res.status(200).send(savedUser);
        } catch (error) {
            res.status(500).send(`Server error ${error}`);
        }
    });

    app.listen(port, () => {
        console.log(`server running on http://localhost:${port}/`);
    });

    // console.log("Inserting a new user into the database...")
    // const user = new User() 
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)
    
    // users.forEach(user => console.log(user["id"]))

    // console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
