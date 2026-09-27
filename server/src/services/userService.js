import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

class UserService
{
    async createUser(userData)
    {
        const { fullName, email, password } = userData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        return user;
    }

    async findByEmail(email)
    {
        return await User.findOne({
            where: { email }
        });
    }

    async findById(id)
    {
        return await User.findByPk(id);
    }

    async comparePassword(bodyPassword, userPassword)
    {
        return await bcrypt.compare(bodyPassword, userPassword);
    }
}

export default new UserService();