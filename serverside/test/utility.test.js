import { hashedPassword } from "../src/utils/passwordHash.js";
import bcrypt from 'bcrypt';

test('should hash the pasword', async () => {
    const password = '1234567';
    const response = await hashedPassword(password);

    expect(response).toBeDefined();
    expect(response).not.toBe(password);

});

test('should create a hash that matches the original password', async () => {

    const password = '123456';
    const hash = await hashedPassword(password);
    const isMatch = await bcrypt.compare(password,hash);

    expect(isMatch).toBe(true);
});
