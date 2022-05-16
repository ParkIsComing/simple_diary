import React,{ useState, useEffect } from "react";

const CounterA = React.memo(({count}) => {
    useEffect(()=>{
        console.log(`update countA : ${count}`)
    });
    return <div>{count}</div>
});


//js에서는 객체 비교시 얕은 비교
const CounterB = React.memo(({obj}) => {
    useEffect(()=>{
        console.log(`update countB: ${obj.count}`)
    });
    return <div>{obj.count}</div>
});

//return true -> 리렌더링x
//return false -> 리렌더링o
const areEqual = (prevProps, nextProps) => {
    if(prevProps.obj.count === nextProps.obj.count){
        return true;
    }
    return false;
    //걍 아래처럼 바꿔도 됨
    //return prevProps.obj.count === nextProps.obj.count;
}

//counterB는 areEqual의 판단에 따라서 리렌더링 할지말지 결정됨
const MemoizedCounterB= React.memo(CounterB, areEqual);
    

const OptimizeTest = () =>{
    const [count, setCount] = useState(1);
    const[obj, setObj] = useState({
        count:1
    });

    return <div style={{padding:50}}>
        <div>{/*똑같은 값으로 바뀌는 상태변화*/}
            <h2>Counter A</h2>
            <CounterA count={count}/>
            <button onClick={()=>setCount(count)}>A button</button> 
        </div>
        <div>{/*똑같은 값을 가지는 객체를 할당*/}
            <h2>Counter B</h2>
            <MemoizedCounterB obj={obj}/>
            <button onClick={()=>{setObj({
                count: obj.count 
            })}}>B button</button>
        </div>

    </div>
}

export default OptimizeTest;