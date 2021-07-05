export interface INewUser{
    name: string,
    email: string,
    password: string
}
export interface IDecodeToken{
    newUser?: INewUser,
    iat: number,
    exp: number
}