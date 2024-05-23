import api from "../api"

export const postApi = {
    getPostsByCommId: (commId) => api.get(`post/${commId}`),
    addPost: (data, loginUser) => api.post('post', data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": loginUser.token,
        }
    }),
    // addPostImg: (data) => api.post('posts/image', data, option[1]),
}
