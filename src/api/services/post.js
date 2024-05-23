import api from "../api"

const option = [
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    },
    {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": localStorage.getItem("token"),
        }
    }
]

export const postApi = {
    getPostsByCommId: (commId) => api.get(`post/${commId}`),
    addPost: (data) => api.post('post', data, option[1]),
    // addPostImg: (data) => api.post('posts/image', data, option[1]),
}
