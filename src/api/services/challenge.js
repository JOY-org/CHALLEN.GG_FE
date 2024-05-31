import api from "../api"


//토큰안에 유저 정보도 들어가있음
export const challengApi = {
    getChallenge: () => api.get(`challenge/`),

    interestChallenge: (id, token) =>  api.post(
        'challenge/interestchallenge',
        {id},
        {headers: {"Authorization": token}}
    ),
    uninterestChallenge: (id, token) => api.delete(`challenge/interestchallenge`, {
        headers: {
            "Authorization": token
        },
        data: {id}
    }),

    uploadSuccess: (id, token) =>  api.post(
        'challenge/success',
        {id},
        {headers: {"Authorization": token}}
    ),

    deleteSuccess: (challengeId,token) => api.delete(`challenge/success`, {
        headers: {
            "Authorization": token
        },
        data: {challengeId}
    }),

    getSuccess: (id,token) => api.get(`challenge/success`, {
        headers: {
            "Authorization": token
        },
        params:{id}
    }),
}
