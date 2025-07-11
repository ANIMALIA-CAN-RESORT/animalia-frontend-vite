export interface Usuario {
    id:number | string;
    nombre: string;
    apellido: string;
    username: string;
    pais: string;
    password: string;
    rol: string;
    url?:string;
}