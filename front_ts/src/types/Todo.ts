export default interface Todo{
    _id : string,
    title: string,
    description : string,
    done:boolean
}

export interface Auth{
    token:string ,
    username:string
}