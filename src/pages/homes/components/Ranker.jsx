import * as React from 'react';
import styleHome from "../../../components/css_module/Home.module.css"
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Ranker() {
    //유저의 닉네임,exp,이미지,레벨
    const [ranker, setRanker ] = useState([]);
    const [level, setLevel] = useState();
    //유저정보 가져오기
    const getUserInfo = async()=>{
        try {//여기서 
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
            setRanker(res.data.payload);
            console.log(res.data.payload);
        } catch (error){
            console.error(error);
        }
    }
    useEffect(()=>{
        getUserInfo();
    }, []);

    //랭킹을 exp높은 순서로 내림차순정렬
    const newRanker =  [...ranker].sort((a,b) => b.exp - a.exp);


    return (
        <div  className={styleHome.RankerName}>
            <h1>ToDay ranker</h1>
            <div>
                </div>
            {newRanker.map((r)=>(
                    <div key={r.id} className={styleHome.Ranker} >
                    <img
                        src={`http://localhost:8000/${r.img}`}
                        alt={`${r.nickname}'s profile`}
                    />
                    <div>
                        <span>{r.nickname}</span>
                        <span>{r.exp}</span>
                    </div>
                </div>
                )
            )}
        </div>
    );
}
