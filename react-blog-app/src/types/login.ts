export type FormState = {
  email: string;
  password: string;
}

export type FormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | {type:'RESET'}


  export type User={
    name:string,
    email:string,
    image?:string,
    lastLogin?:string,
    loginMethod?:string,
    isVarified?:boolean,
    id:string,
    user_id?:string,
    author_id?:string
  }