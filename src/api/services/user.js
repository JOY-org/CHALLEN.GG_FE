import api from "../api"



export const userApi = {
    followUser: (id, token) => api.post(`users/follow`, {id}, {
        headers: {
            "Authorization": token
        }
    }),
    unFollowUser: (id, token) => api.delete(`users/follow`, {
        headers: {
            "Authorization": token
        },
        data: {id}
    }),

    getFollowings: (id, token) => api.get(`/users/followings/${id}`, {
        headers: {
            "Authorization": token
        }
    }),
    // delRefreshToken: (id) => api.patch(`/auth/refresh`, {id})
}
