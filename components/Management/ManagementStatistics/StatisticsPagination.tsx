
import { setGlobalState,useGlobalState } from "state";


const StatisticsPagination = (InitSlice:any) => {
    const [useInitSlice] = useGlobalState("setInitSlice");
    const buttons = [];

    const startPage = Math.max(1, InitSlice.InitSlice - 2);

      buttons.push(
        <button className="paginationButton"  key={"A1"} onClick={()=>setGlobalState("setInitSlice",1)}>❰❰</button>
      )
      buttons.push(
        <button className="paginationButton" key={"B1"} onClick={()=>setGlobalState("setInitSlice", useInitSlice===1?1:useInitSlice - 1)}>❰</button>
      )
    
    for (let i = startPage; i <= Math.min(InitSlice.Pages, startPage + 4); i++) {
      buttons.push(
        <button className="paginationButton"
          key={i}
          onClick={() => setGlobalState("setInitSlice",i)}
          style={{ border: InitSlice.InitSlice === i ? 'solid 2px #cedbe9' : 'none'}} // Change font size for active page
        >
          {i}
        </button>
      );
    }

      buttons.push(
        <button className="paginationButton" key={"A"} onClick={()=>setGlobalState("setInitSlice", useInitSlice===InitSlice.Pages?InitSlice.Pages:useInitSlice + 1)}>❱</button>
      )
      buttons.push(
        <button className="paginationButton" key={"B"} onClick={()=>setGlobalState("setInitSlice",InitSlice.Pages)}>❱❱</button>
      )

    return buttons;
  };

  export default StatisticsPagination; 