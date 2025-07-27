import {Router} from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const router = Router();

const userRepo = AppDataSource.getRepository(User);

router.get('/user', async (req, res) => {
    const users = await userRepo.find();
    res.send(users);
});

router.post('/user', async (req, res) => {
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

router.delete('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if(!id) return res.status(400).send('User not found');

    try {
        const result = await userRepo.delete(id);
        if(result.affected === 0) res.status(400).send(`User not found`);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send(`Failed to delete user`);
    }
});

// export default router;