
import styled from "../../../../CHALLEN.GG_FE/src/components/css_module/ShoppingCart.module.css";
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Cart = () => {
  // const location = useLocation(); // 현재 위치의 상태를 가져옴
  // const initialProducts = location.state?.cartItems || []; // 초기 제품목록을 위치 상태에서 가져옴, 없으면 빈 배열 사용. location.state에 있는 cartItems를 초기 목록으로 설정

  // 임시데이터
  const initialProcuts = [
    {name: '상품1', price: 10000, quantity: 1, point: 100, total: 10000, checked: false},
    {name: '상품2', price: 20000, quantity: 2, point: 200, total: 20000, checked: false},
    {name: '상품3', price: 30000, quantity: 3, point: 300, total: 30000, checked: false},
  ]
  const [products, setProducts] = useState(initialProcuts); // 제품목록을 상태로 관리
  const [allChecked, setAllChecked] = useState(false); // 전체 선택 체크박스 상태 관리

  // 전체선택 체크박스
  const handleAllChecked = (event) => {
    const isChecked = event.target.checked; // 체크박스의 현재상태를 나타냄
    const updatedProducts = products.map(product => ({ ...product, checked: isChecked})); // 모든 제품의 checked 상태를 isChecked 로 업데이트한 배열
    setProducts(updatedProducts);
    setAllChecked(isChecked);
  }

  // 선택된 제품 삭제, 선택 되지 않은것만 남김
  const handleDelete = () => {
    // updatedProducts의 checked 상태가 false 인 제품만 남긴 배열
    const updatedProducts = products.filter(product => !product.checked); 
    setProducts(updatedProducts);
    setAllChecked(false);
  }
  
  // 개별 체크박스 , 개별제품의 checked 상태를 토글
  const handleCheckboxChange = (index) => {
    const updatedProducts = [...products];
    // 클릭된 제품의 checked 상태를 토글한 배열
    updatedProducts[index].checked = !updatedProducts[index].checked;
    setProducts(updatedProducts);
  }

  // 전체선택 상태 업데이트
  useEffect(() => {
    const allProductsChecked = products.length > 0 && products.every(product => product.checked);
    setAllChecked(allProductsChecked); // 모든제품의 checked 상태가 true 인지 확인
  }, [products]); // product 상태가 변경될 때마다 전테 선택 체크박스 상태를 업데이트
  

  return (
    <div className={styled.container}>
      <div style={{
        height: "150px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#F4F4F4",
        marginBottom: "30px"
        }}>
        <h1>장바구니 페이지 입니다.</h1>
      </div>
      <h2 className={styled.cart_title}>장바구니</h2>
        <table className={styled.cart_form}>
            <thead className={styled.t_title}>
              <tr>
                <th className={styled.product_check}><input type="checkBox" onChange={handleAllChecked} checked={allChecked} />
                </th>
                <th className={styled.product_name}>물품명</th>
                <th className={styled.product_price}>가격</th>
                <th className={styled.product_quantity}>수량</th>
                <th className={styled.product_point}>포인트</th>
                <th className={styled.product_total}>합계</th>
              </tr>
            </thead>
            <tbody>
              {/* --------실제 DB로 연결 시켜서 추가되어야 하는 부분 -------- */}
              {products.map((product, index) => (
              <tr key={index} className={styled.tr_body}>
                  <td><input type="checkBox" name={`select_${index}`} checked={product.checked} onChange={() => {handleCheckboxChange(index)}} /></td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.point * product.quantity}</td>
                  <td>{product.total * product.quantity}</td>
              </tr>
              ))}
            </tbody>
        </table>
              <div className={styled.del_button_box}>
                <button className={styled.del_button} onClick={handleDelete}>삭제하기</button>
              </div>
              <div className={styled.payment}>
                <span className={styled.final_pay}>최종 결제 금액</span>
                <span className={styled.won}>{
            products.reduce((total, product) => total + (product.price * product.quantity), 0)
          }원</span>
              </div>
            <div className={styled.buttons}>
              <Link to="/ShoppingDetail">
                  <button className={styled.back_button} >뒤로가기</button>
              </Link>
              <button className={styled.order_button} >구매하기</button>
            </div>
      </div>
  )
}
export default Cart;