import api from "../api"



export const challengApi = {
    getChallenge: () => api.get(`challenge/`),
    // unFollowUser: (id, token) => api.delete(`users/follow`, {
    //     headers: {
    //         "Authorization": token
    //     },
    // }, {id}),
    // getFollowings: (id, token) => api.get(`/users/followings/${id}`, {
    //     headers: {
    //         "Authorization": token
    //     }
    // }),
    // getFollowers: (id, token) => api.get(`/users/followers/${id}`, {
    //     headers: {
    //         "Authorization": token
    //     }
    // }),
    // getUser: () => api.get(`/users`),

    // patchUploadImg: (data, token) => api.patch('/users', data, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         "Authorization": token
    //     }
    // }),

    // getUserInfo: (token) => api.get(`/users/myinfo`, {
    //     headers: {
    //         "Authorization": token
    //     }
    // }),
    // getPoint: (id,token) => api.get(`/users/point`, {
    //     headers: {
    //         "Authorization": token
    //     },
    //     data: {id}
    // }),

    // delRefreshToken: (id) => api.patch(`/auth/refresh`, {id})
}
