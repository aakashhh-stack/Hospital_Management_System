import bcrypt from 'bcrypt';

export const hashedPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}