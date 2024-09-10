
import { Icon } from "@iconify/react";
import { setGlobalState,useGlobalState } from "state";


const StatisticsPagination = (InitSlice:any) => {
    const [useInitSlice] = useGlobalState("setInitSlice");
    const buttons = [];

    const startPage = Math.max(1, InitSlice.InitSlice - 2);

      buttons.push(
        <button className="paginationButton"  key={"A1"} onClick={()=>setGlobalState("setInitSlice",1)} aria-label="Name">
          <Icon icon="gg:chevron-double-left" />
        </button>
      )
      buttons.push(
        <button className="paginationButton" key={"B1"} onClick={()=>setGlobalState("setInitSlice", useInitSlice===1?1:useInitSlice - 1)} aria-label="Name">
          <Icon icon="gg:chevron-left"/>
        </button>
      )
    
    for (let i = startPage; i <= Math.min(InitSlice.Pages, startPage + 4); i++) {
      buttons.push(
        <button className="paginationButton"
          key={i}
          onClick={() => setGlobalState("setInitSlice",i)}
          style={{ border: InitSlice.InitSlice === i ? 'solid 2px #ff0000' : 'none'}} // Change font size for active page
          aria-label="Name">
          {i}
        </button>
      );
    }

      buttons.push(
        <button className="paginationButton" key={"A"} onClick={()=>setGlobalState("setInitSlice", useInitSlice===InitSlice.Pages?InitSlice.Pages:useInitSlice + 1)} aria-label="Name">
          <Icon icon="gg:chevron-right"/>
        </button>
      )
      buttons.push(
        <button className="paginationButton" key={"B"} onClick={()=>setGlobalState("setInitSlice",InitSlice.Pages)} aria-label="Name">
                    <Icon icon="gg:chevron-double-right" style={{transform:'scaleX(1)'}} />
        </button>
      )

    return buttons;
  };

  export default StatisticsPagination; 