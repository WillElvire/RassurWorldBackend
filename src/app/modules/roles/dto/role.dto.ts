enum UserRoles {
    ADMIN = 1,
    MEMBER = 2,
}

export interface RoleDto {
    flag : UserRoles,
    id : string , 
    libelle : string,
}
  
export { UserRoles};