import { useRef, useState } from "react";

const DiaryItem = ({ author, content, created_date, emotion, id,onRemove, onEdit }) => {

  const[isEdit,setIsEdit] = useState(false);//수정중이지 않을 때는 false, true면 수정중
  const toggleIsEdit = () => setIsEdit(!isEdit);//호출되면 false->true, true->false

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if(window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)){
      onRemove(id);
    }
  }

  const handleQuitEdit = () =>{//수정하다가 취소누르고 다시 수정해도 저장된 content가 뜸. 수정하다만 내용이 아니라
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if(localContent.length < 5){
      localContentInput.current.focus();
      return;
    }
    if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`));
    onEdit(id, localContent);
    toggleIsEdit(false);
  }

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <br />
        <span className="date">
          {new Date(created_date).toLocaleString()}
        </span>{" "}
        {/*Date(밀리세컨드).toLocaleString()은 밀리세컨드를 yyyy.mm.dd 시각으로 변환*/}
      </div>
      <div className="content">
        {isEdit ?(
        <><textarea 
        ref={localContentInput}
        value={localContent} 
        onChange={(e)=>setLocalContent(e.target.value)}/>
        </>
        ):(
        <>{content}</>
        )}
      </div>
      {isEdit? <>
        <button onClick={handleQuitEdit}>수정 취소</button>
        <button onClick={handleEdit}>수정 완료</button>
      </>:<>
        <button onClick={handleRemove}>삭제하기</button>
        <button onClick={toggleIsEdit}>수정하기</button>
      </>}
    </div>
  );
};

export default DiaryItem;
