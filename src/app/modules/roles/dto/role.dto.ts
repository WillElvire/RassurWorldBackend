enum UserRoles {
    ADMIN = 1,
    MEMBER = 2,
    CUSTOMER = 3
}

export interface RoleDto {
    flag : UserRoles,
    id : string , 
    libelle : string,
}
  
export { UserRoles};