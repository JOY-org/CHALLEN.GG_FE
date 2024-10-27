![스크린샷 2024-06-08 105355](https://github.com/JOY-org/.github/assets/159886707/9ebefbf9-5b93-4b31-9768-f01833e3f4af)
# 💪 건강 관련 챌린지 서비스 웹 [CHALLEN.GG](https://github.com/JOY-org/CHALLEN.GG_DOC) READ.ME

## 1. 프로젝트 소개 
![스크린샷 2024-06-08 105736](https://github.com/JOY-org/.github/assets/159886707/17a35421-814b-4325-8d9d-44600faffc1b)

COVID-19 팬데믹 이후 사람들은 언제 찾아올지 모르는 질병에 대비하기 위해 건강한 생활을 추구하게 되었다. 대학생을 포함한 젊은 세대도, 노인 분들을 포함한 기성세대도 남녀노소 가릴 것 없이 건강한 라이프스타일을 추구하며 각종 운동 활동에 적극적인 태도를 보인다. 특히 갓생, 오운완 등 근래에 사용되는 유행어들은 건강한 라이프스타일을 추구하는 현대사회의 트렌드를 잘 내포하고 있다. 당 프로젝트는 이에 따라 챌린지, 커뮤니티, 쇼핑 등의 기능을 탑재한 어플리케이션을 만들어 현대인들의 건강한 삶을 활성화하고 운동 욕구를 촉진시키려고 한다.
## 팀원 소개
![Frontend Developer](https://img.shields.io/badge/Frontend-Developer-blue?style=for-the-badge&logo=react&logoColor=white) 

-팀장:김진영

-팀원:조다솜

-팀원:차민성

 ![Backend Developer](https://img.shields.io/badge/Backend-Developer-green?style=for-the-badge&logo=node.js&logoColor=white)
 
-팀원:김우진

-팀원:박석원

## 3.시현 영상 
https://github.com/user-attachments/assets/ee73bb63-6d7a-41d8-9cae-3fe1f3a4278d

## 4. 사용기술 
**Frontend**
- Language :
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
- Library :
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- Markup and Styling :
  ![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**Backend**
- Language :
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
- Library & Framework :
  ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&logoColor=61DAFB)
- Database :
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 5.프로젝트 구조
### [FrontEnd](https://github.com/JOY-org/CHALLEN.GG_FE)
```
src
 ┣ api
 ┃ ┣ services/
 ┃ ┗ api.js
 ┣ assets/
 ┣ components/
 ┃ ┣ css_module/
 ┃ ┣ layout/
 ┣ contexts
 ┃ ┗ LoginContext.jsx
 ┣ hooks
 ┃ ┣ useAuth.jsx
 ┃ ┗ useProvideAuth.jsx
 ┣ images/
 ┣ pages
 ┃ ┣ community/
 ┃ ┃ ┣ css_module/
 ┃ ┣ homes/
 ┃ ┃ ┣ css_module/
 ┃ ┃ ┣ components/
 ┃ ┃ ┗ imageㄴ/
 ┃ ┣ mypages
 ┃ ┃ ┣ css_module/
 ┃ ┣ notfound
 ┃ ┃ ┣ css_module/
 ┃ ┣ shoppingmall
 ┃ ┃ ┣ css_module/
 ┃ ┃ ┣ components/
 ┃ ┃ ┣ images/
 ┃ ┣ Home.jsx
 ┃ ┣ MyPage.jsx
 ┃ ┣ Shopping.jsx
 ┃ ┣ SignIn.jsx
 ┃ ┗ SignUp.jsx
 ┣ utils
 ┃ ┗ date.js
 ┣ App.js
 ┣ index.css
 ┗ index.js
```
### [BackEnd](https://github.com/JOY-org/CHALLEN.GG_BE)
```
Challen.GG_BE
├─ .env
├─ .gitignore
├─ .nvmrc
├─ app.js
├─ controllers/
├─ middlewares/
├─ models/
├─ passport/
├─ public
│  └─ uploads
├─ utils/
├─ package.json
├─ README.md
```
## 5. 역할 분담
### 🦉김진영
  - 회원가입, 로그인<br />
    - react-hook-form을 이용한 회원가입, JWT 로그인 구현
  - 커뮤니티 페이지<br />
    -  커뮤니티에서의 게시글 작성, 게시글 좋아요, 댓글 작성 구현
    
### 🍀조다솜
  - 메인페이지
    :전체페이지 레이아웃구성,메인페이지 전체기능과 디자인 구현,랭킹스템디자인및 기능구현    
  
  - 알림페이지
    :알림페이지 기능구현및 디자인(삭제버튼제외)

  - 마이페이지
   :마이페이지 전체 기능과 디자인 구현
   
### 🌱차민성
  - UI
    - 페이지 : 쇼핑몰 메인, 상세, 장바구니, 구매목록 페이지
  - 기능
    - 메인 : 카테고리 필터기능, 검색기능(상품명), 검색버튼, 페이지네이션
    - 상세 : 수량 인풋창, 장바구니담기 버튼, 구매하기 버튼, 썸네일 이미지 변경, 페이지네이션
    - 장바구니 : 체크박스, 삭제하기 버튼, 뒤로가기 버튼
    - 구매목록 : 주문내역 검색/초기화(상품명)

### 🐥김우진
  - UI<br />
    - 마이페이지 알림 삭제 버튼
  - 기능<br />
    -  DB 설계와 관계 설정<br />
    -  게시글, 게시글 댓글, 알림, 챌린지, 챌린지 인증 등록 및 수정<br />
    -  팔로워 팔로잉, 게시글 좋아요 기능  <br />
### 👓박석원
  -  DB 설계와 관계 설정<br />
  -  Git 관리<br />
  -  발표<br />
## 6. 개발 기간 및 작업 관리
### 개발 기간
  - 전체 개발 기간 : 2024-04-30 ~ 2024-06-10
### 작업 관리
  - Github 를 이용하여 진행상황을 저장하고 공유하였습니다.
## 7. 개발 후기
### 🦉김진영
  이번 프로젝트의 팀장을 맡은 김진영입니다. 다들 첫 프로젝트라 미숙한 점이 많았지만 팀원 전부 필수 기능을 구현한 것에 만족을 느낍니다. 비록 최적화를 진행하지 못하였고 다른 상태 관리 라이브러리를 사용하지 못한 점이 아쉬웠지만 보완할 점을 명확히 알고 가는 것에 의의를 둡니다. 저희 팀원들 모두 고생하셨습니다.
### 🍀조다솜
  안녕하세요 조다솜개발자입니다. 약 5주간의 기간동안 팀원들과 챌린지지의 프로젝트를 완성했습니다. 모든걸 끝낸 지금 느끼는 감정은 많은 애정과 아쉬움입니다.초창기 계획만해도 완벽하다고 생각했지만 저희의 미숙함으로 예상외의 문제들이 발생했습니다. 그로인해 늦은 밤까지 개발하고 팀원간의 마찰이있었지만 나중에 제가 더 성장한뒤에 추가 작업을 하고싶을 정도로 많은 애정을 가지고있습니다. 저의 첫번째 프로젝트 많은 자부심을 가지고 끝냅니다 감사합니다.
### 🌱차민성
  안녕하세요. 프론트엔드 개발자 차민성입니다.
  프로젝트 시작하기 전에 제가 코딩작성이 전혀 되지가 않아서 몇 차례나 과정을 포기할까 생각 많이 했습니다.
  그래도 선생님의 격려로 프로젝트 시작을 했고, 팀원들의 많은 배려덕분에 구현해야될 부분들을 많이 못했지만 큰 사고 없이 프로젝트를 마칠 수 있었습니다. 
  ```js
  console.log('선생님과 팀원분들에게 감사인사를 드리고 싶네요. 모두 수고 많았습니다🙏')
  ```

### 🐥김우진
 안녕하세요, 팀원 김우진입니다.
 이번 프로젝트는 저에게 첫 프로젝트였기에, 많은 뿌듯함과 함께 약간의 아쉬움도 남습니다. 부족한 점이 많았지만, 팀원들 덕분에 잘 마무리할 수 있었습니다. 프로젝트를 진행하면서 여러 도전과 과제를 맞닥뜨렸지만, 여러분의 도움과 협력 덕분에 모든 어려움을 극복할 수 있었습니다.
 함께 고생한 팀원들 모두 정말 수고 많으셨습니다. 여러분과 함께 일하면서 많은 것을 배웠고, 함께한 시간이 큰 의미로 다가옵니다. 앞으로도 화이팅 해서 각자의 목표를 이루시길 진심으로 응원합니다.
### 👓박석원
 이번 프로젝트에 참여한 박석원입니다. 
 저 스스로에게는 아쉬움이 있는 프로젝트였지만, 좋은 팀원분들과 함께 작업하여 스스로 배우고 반성할 수 있는 기회가 되었습니다. 
 모두 포기하기 않고 약 반 년 동안의 여정을 함께 달릴 수 있어서 기뻤습니다. 수고 많으셨습니다!
 `Happy Coding!`

