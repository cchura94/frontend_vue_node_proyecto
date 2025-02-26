import Api from "./api.service";

export default {
    listar(){
        return Api().get("/v1/usuario");
    },
    guardar(datos){
        return Api().post("/v1/usuario", datos);
    },
    mostrar(id){
        return Api().get(`/v1/usuario/${id}`);
    },
    modificar(id, datos){
        return Api().put(`/v1/usuario/${id}`, datos);
    },
    eliminar(id){
        return Api().delete(`/v1/usuario/${id}`);
    }
}