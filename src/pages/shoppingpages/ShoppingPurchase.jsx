import React from 'react';
import styled from "../../../../CHALLEN.GG_FE/src/components/css_module/ShoppingPurchase.module.css";

const Purchase = () => {

  const orders = [
    {
      date: new Date('2024-05-22'),
      imgSrc: 'http://via.placeholder.com/90',
      info: '물품정보',
      state: '배송완료'
    },
  ]

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
        <h1>쇼핑몰 구매목록 페이지입니다.</h1>
      </div>

      <h2 className={styled.purchase_title}>구매목록</h2>
      <div className={styled.form}>
        <div className={styled.search_list}>
          <div>
            <h3>주문내역 검색</h3>
          </div>
        </div>
        <div className={styled.sort_box}>
          <div className={styled.search_box}>
            <div className={styled.input_button}>
              <input className={styled.input} placeholder='상품명/주문상태/날짜 입력' />
              <button className={styled.search_button}>검색</button>
              <button className={styled.reset_button}>초기화</button>
            </div>
          </div>
        </div>
        <h3 className={styled.order_list}>주문내역</h3>
        <table className={styled.table}>
          <thead className={styled.order_title}>
            <tr>
              {/* th 주문일자 태그 자체에 날짜 표시 */}
              <th className={styled.order_date}>{orders.length > 0 && orders[0].date.toLocaleDateString()}</th>
              <th className={styled.order_info}></th>
              <th className={styled.order_state}>배송상태</th>
              <th className={styled.order_detail}>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
            <tr className={styled.add_prd} key={index}>
              <td className={styled.small_img} >
                <img src={order.imgSrc} alt='상품 이미지'></img>
              </td>
              <td className={styled.info} >{order.info}</td>
              <td className={styled.status} >{order.state}</td>
              <td className={styled.detail} >
                <div className={styled.button_box}>
                  <button className={styled.button}>구매확정</button>
                  <button className={styled.button}>반품/교환</button>
                  <button className={styled.button}>후기작성</button>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};
export default Purchase;