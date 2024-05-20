import MyStyle from "../../../components/css_module/MyPage.module.css"

const MyInfo = () => {
    return (
        <div className={MyStyle.MyInfo} >
            나의 정보관리
        </div>
    );
}

export default MyInfo;