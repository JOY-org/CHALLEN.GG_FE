import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ShoppingDetail로 정보 전달
import styled from "../../../../CHALLEN.GG_FE/src/components/css_module/ShoppingList.module.css";
import likeIcon from "../../images/likeIcon.png";


const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const navigate = useNavigate(); // ShoppingDetail로 정보 전달

  useEffect(() => {
    const fetchProducts = async () => {
      // API 호출 
      // 임시 데이터, index 값을 이용해서 카테고리 값도 적용
      const data = Array.from({length: 12}, (_, index) => ({
        id: index,
        name: `상품명 ${index + 1}`,
        discountPrice: `${(index + 1) * 1000}원`,
        price: `${(index + 1) * 2000}원`,
        rating: ` ${index + 1}`,
        category: index % 2 === 0 ? '남성' : '여성',
        isNew: index < 6,
        isRecommended: index % 3 === 0,
        isPopular: index % 4 === 0,
        onSale: index % 5 === 0,
        imageUrl: "http://via.placeholder.com/150",
        largeImageUrl: "http://via.placeholder.com/834"
      }));
      setProducts(data); // data.reverse() 상품 1번이 맨 밑으로 감
      setFilteredProducts(data); 
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // 검색버튼 클릭
  const handleSearchClick = () => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      // 공백 구분 없이, 띄어쓰지 않아도 검색됨
      const sanitizedSearchTerm = searchTerm.toLowerCase().replace(/\s/g, '');
      const filtered = products.filter(product =>
        product.name.toLowerCase().replace(/\s/g, '') === sanitizedSearchTerm
      );
      setFilteredProducts(filtered);
    }
  };
  // 인풋창에서 검색 버튼 누르지 않고 Enter 눌러도 검색 가능
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };
  // 카테고리 클릭 시 필터 기능
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };
  // 임시데이터에 index를 이용해서 각 카테고리 값을 적용
  useEffect(() => {
    if (activeFilter) {
      const filtered = products.filter(product => {
        if (activeFilter === '신상품') return product.isNew;
        if (activeFilter === '추천') return product.isRecommended;
        if (activeFilter === '인기') return product.isPopular;
        if (activeFilter === '남성') return product.category === '남성';
        if (activeFilter === '여성') return product.category === '여성';
        if (activeFilter === '세일') return product.onSale;
        return true;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [activeFilter, products]);

  // ShoppingDetail로 정보 전달
  const handleCardClick = (product) => {
    navigate('/ShoppingDetail', {state: { product } });
  }

  return (
    <div className={styled.container}>
      <div>
        <div className={styled.filter_buttons}>
        {/* 카테고리 버튼 클릭 시 handleFilterClick()함수를 통해 필터기능 동작 */}
          <button className={styled.filter_button} onClick={() => handleFilterClick('신상품')}>신상품</button>
          <button className={styled.filter_button} onClick={() => handleFilterClick('추천')}>추천</button>
          <button className={styled.filter_button} onClick={() => handleFilterClick('인기')}>인기</button>
          <button className={styled.filter_button} onClick={() => handleFilterClick('남성')}>남성</button>
          <button className={styled.filter_button} onClick={() => handleFilterClick('여성')}>여성</button>
          <button className={styled.filter_button} onClick={() => handleFilterClick('세일')}>세일</button>
          <input
            className={styled.search_input}
            type="text"
            placeholder=" 상품 검색하기"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <button 
            className={styled.search_button} 
            onClick={handleSearchClick}
          >검색</button>
        </div>
        <div className={styled.product_container}>
          {filteredProducts.map((product) => (
            <div
              className={styled.product_card}
              key={product.id} 
              onClick={() => handleCardClick(product)} // ShoppingDetail로 정보 전달
            >
              <img className={styled.product_img} src={product.imageUrl} alt="Product" />
              <div className={styled.product_details}>
                <h3 className={styled.product_name}>{product.name}</h3>
                <p className={styled.product_price}>{product.price}</p>
                <p className={styled.product_disc_price} >{product.discountPrice}</p>
                <p className={styled.product_rating}>
                  <img src={likeIcon} alt='like_icon' className={styled.like_icon}></img>
                  {product.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
