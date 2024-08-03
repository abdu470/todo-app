import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../../../model/User';
import connect from '../../../utils/db';


// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) =>{

        await connect();
        
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        
        res.status(200).json({ token });
}


//export default handler;
