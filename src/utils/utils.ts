import bcript from 'bcryptjs';


class Utils {
    comparePasswords(password: any, password1: any) {
        throw new Error("Method not implemented.");
    }
    comparePassword(password: any, password1: any) {
        throw new Error("Method not implemented.");
    }


    public async hashPassword(password: string): Promise<string> {
        const salt = await bcript.genSaltSync(10);
        return await bcript.hashSync(password, salt);
    }


    public async checkPassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await bcript.compareSync(password, encryptedPassword);
    }


}


export const utils = new Utils();
