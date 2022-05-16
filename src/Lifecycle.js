import React, { useEffect, useState } from "react";

const Lifecycle = () => {
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     console.log("mount!"); //depc array가 빈배열이면 컴포넌트가 마운트된 시점에만 작동
//   }, []);

//   useEffect(()=>{
//     console.log("update!");//depc array를 전달하지 않으면 컴포넌트가 업데이트(리렌더링)되는 시점에 작동
//   })

//   useEffect(()=>{
//     console.log(`count is update : ${count}`);
//     if(count >5){//이 경우 count값이 바뀔때마다 useEffect가 작동하니 count값이 특정값이 되면 특정 행동을 하도록 
//         alert('count가 5를 넘음. 1로 초기화함');
//         setCount(1);
//     }
//   },[count]);

//   useEffect(()=>{
//     console.log(`text is update : ${text}`);
//   },[text])

const UnmountTest = () => {
    useEffect(()=>{
        console.log("mount!");

        return ()=>{//unmount되는 시점에 작동
            console.log("unmount!")
        }
    },[]);
    return <div>Unmount Testing Component</div>

}

const [isVisible, setIsVisible] = useState(false);
const toggle = () => setIsVisible(!isVisible);


//isVisible이 true면 뒤의 값도 봐야함(&&이니까) -> <UnmountTest/>작동 
//isVisible이 false이면 단락회로평가 -> <UnmountTest/>작동 안함
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>on/off</button>
      {isVisible && <UnmountTest/>} 
      
    </div>
  );
};

export default Lifecycle;
