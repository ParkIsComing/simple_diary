import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, onRemove, diaryList}) => {
    console.log(diaryList);
    return <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((it)=>(
                <DiaryItem onEdit={onEdit} key={it.id} {...it} onRemove={onRemove}/>  ///App.js -> DiaryList.js -> DiaryItem.js순으로 전달
            
            ))}
        </div>
    </div>
}

DiaryList.defaultProps = {
    diaryList:[]
}

export default DiaryList;