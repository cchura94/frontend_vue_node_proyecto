import Api from "./api.service";

export default {
    listar(page=1, limit=10, buscar=''){
        return Api().get(`/v1/producto?page=${page}&limit=${limit}&q=${buscar}`);
    },
    guardar(datos){
        return Api().post(`/v1/producto`, datos);
    },
    modificar(id, datos){
        return Api().put(`/v1/producto/${id}`, datos);
    },
    mostrar(id){
        return Api().get(`/v1/producto/${id}`);
    },
    eliminar(id){
        return Api().delete(`/v1/producto/${id}`);
    },
    subirImagen(id, formData){
        return Api().post(`/v1/producto/${id}/actualizar-imagen`, formData);
    }
}