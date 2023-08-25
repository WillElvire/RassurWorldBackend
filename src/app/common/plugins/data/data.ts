export const isEmptyField = (obj : {},logType : string = "error") => {
    let count= 0;
    let index : number[] = [];
    Object.values(obj).forEach((value,i)=>{
      if(!value) {
        index.push(i)
        count ++;
      }
    })
    return   {count , index };
}

export const generateUniqueCodeForUser = ()=> {
  return "RA"+Math.floor(Math.random() * 1000000);
}