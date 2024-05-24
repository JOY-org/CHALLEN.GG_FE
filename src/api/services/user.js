import api from "../api"

const option = 
    {
        headers: {
            "Authorization": localStorage.getItem("token"),
        }
    }


export const userApi = {
    followUser: (id, loginUser) => api.post(`users/follow`, {id}, {
        headers: {
            "Authorization": loginUser.token,
        }
    }),
    unFollowUser: (id, loginUser) => api.delete(`users/follow`, {
        headers: {
            "Authorization": loginUser.token,
        },
        data: {id}
    }),
    getFollowings: (id) => api.get(`/users/followings/${id}`),
}
