import bcryptjs from 'bcryptjs';

export  const hash  = (text :string | number ) =>{
  return bcryptjs.hashSync(text,10)
}

export const compare = (text:string ,textHash :string) => {
  return bcryptjs.compareSync(text,textHash);
}