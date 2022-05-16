import React, { useState, useRef, useEffect } from "react";

const DiaryEditor = ({onCreate} )=> {

    useEffect(({onCreate})=>{
        console.log('diaryeditor render');
    })
    const authorInput = useRef();
    const[state, setState] = useState({
        author:"",
        content:"",
        emotion: 1,//default
    })

    const handleChangeState =(e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setState({
            ...state,
            [e.target.name] : e.target.value//author: 바뀐값 이런식으로
        })
    }

    const handleSubmit = () => {
        if(state.author.length < 1){
            authorInput.current.focus();
            return;
        }

        if(state.content.length <5){
            authorInput.current.focus();
            return;
        }
        onCreate(state.author, state.content, state.emotion);
        alert("저장 성공");
        setState({
            author:"",
            content:"",
            emotion:1
        })
    }

    return <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input name="author"
            ref={authorInput}
            value={state.author} 
            onChange={handleChangeState} />
        </div>
        <div>
            <textarea name="content"
            ref={authorInput}
            value={state.content} 
            onChange={handleChangeState}/>
        </div>
        <div>
            <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>일기 저장</button>
        </div>

    </div>
};

export default React.memo(DiaryEditor);//이 컴포넌트를 React.memo()로 묶어서 내보냄