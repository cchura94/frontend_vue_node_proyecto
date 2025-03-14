import Api from "./api.service";

export default {
    listar(){
        return Api().get("/v1/categoria");
    },
    guardar(datos){
        return Api().post("/v1/categoria", datos);
    },
    mostrar(id){
        return Api().get(`/v1/categoria/${id}`);
    },
    modificar(id, datos){
        return Api().put(`/v1/categoria/${id}`, datos);
    },
    eliminar(id){
        return Api().delete(`/v1/categoria/${id}`);
    }
}