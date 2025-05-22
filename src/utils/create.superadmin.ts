import bcrypt from 'bcrypt';
import { User } from '../models/Users';
import sequelize from '../config/db';

const createSuperadmin = async () => {
    try {
        await sequelize.authenticate()
        const existing = await User.findOne({ where: { login: 'superadmin' } });
        if (existing) {
            console.log('❌ Superadmin already exists.');
            process.exit(0);
        }
        console.log(process.env.SUPERADMIN_PASSWORD);
        
        const password: string | undefined = process.env.SUPERADMIN_PASSWORD || "Erkinovbek2004";
        if (!password) {
            console.error('❌ SUPERADMIN_PASSWORD environment variable is not set.');
            process.exit(1);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const superadmin = await User.create({
            login: 'superadmin',
            password: hashedPassword,
            role: 'superadmin',
        });

        console.log('✅ Superadmin created:', superadmin.login);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating superadmin:', error);
        process.exit(1);
    }
}

export default createSuperadmin;
