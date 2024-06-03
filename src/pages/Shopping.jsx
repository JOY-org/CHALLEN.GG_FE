import React from "react";
import ProductCard from "./shoppingmall/ShoppingProduct";
// import { Button } from "@mui/material";


const Shopping = () => {
    return (
        <div className="container" >
            <div style={{
                    height: "150px", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",
                    backgroundColor: "#F4F4F4",
                    marginBottom: "30px"
                }}>
                <h1>쇼핑몰 페이지입니다</h1>
            </div>

            <div className="button-box" 
            style={{
                marginBottom: "20px", 
                width: "940px", 
                margin: "auto"
            }}>
            </div>
            
            <ProductCard />

        </div>
    );
}


export default Shopping;
