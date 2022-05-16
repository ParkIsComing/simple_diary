import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, //감정점수 1~5의 랜덤한 수로
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []); //빈 배열 전달하면 callback함수는 컴포넌트가 mount되는 시점 실랭됨.

  //일기 생성 함수
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();

    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1; //다음으로 만들어지는 아이템의 아이디값을 1 증가시켜주기 위해
    setData([newItem, ...data]); //새로 추가된 일기가 위로 오게
  };

  //일기 삭제 함수
  const onRemove = (targetId) => {
    const newDiarylist = data.filter((it) => it.id !== targetId); //삭제할 그 일기의 id가 아닌 일기만 newDiarylist에
    setData(newDiarylist);
  };

  //일기 수정 함수
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      ) //돌려보면서 수정할 id만 content 바꾸기
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); //data.length가 변화할 때만 콜백함수가 다시 수행됨. 변화하지 않으면 걍 쓰던 거 그대로
  //getDiaryAnalysis는 더이상 함수가 아니고 그냥 값을 리턴받음

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <OptimizeTest />
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      {/*DiaryItem의 부모가 DiaryList*/}
    </div>
  );
}

export default App;
