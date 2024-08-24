import bcrypt from "bcryptjs"

export const hashPassword = async(password)=>{
    try {
        const saltedRound = 10;
        const hashedPassword= await bcrypt.hash(password, saltedRound);
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async(password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword)
}