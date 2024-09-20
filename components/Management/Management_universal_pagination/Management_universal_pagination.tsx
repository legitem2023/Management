
import { Icon } from "@iconify/react";
import { setGlobalState,useGlobalState } from "state";


const Management_universal_pagination = (InitSlice:any) => {
    const [useInitSlice] = useGlobalState("NewsSetInitSlice");
    const buttons = [];

    console.log(InitSlice,"<<<")

    const startPage = Math.max(1, InitSlice.InitSlice - 2);

      buttons.push(
        <button className="paginationButton"  key={"A1"} onClick={()=>setGlobalState("NewsSetInitSlice",1)} aria-label="Name">
          <Icon icon="gg:chevron-double-left" />
        </button>
      )
      buttons.push(
        <button className="paginationButton" key={"B1"} onClick={()=>setGlobalState("NewsSetInitSlice", useInitSlice===1?1:useInitSlice - 1)} aria-label="Name">
          <Icon icon="gg:chevron-left"/>
        </button>
      )
    
    for (let i = startPage; i <= Math.min(InitSlice, startPage + 4); i++) {
      buttons.push(
        <button className="paginationButton"
          key={i}
          onClick={() => setGlobalState("NewsSetInitSlice",i)}
          style={{ border: InitSlice.InitSlice === i ? 'solid 2px #ff0000' : 'none'}} // Change font size for active page
          aria-label="Name">
          {i}
        </button>
      );
    }

      buttons.push(
        <button className="paginationButton" key={"A"} onClick={()=>setGlobalState("NewsSetInitSlice", useInitSlice===InitSlice.Pages?InitSlice.Pages:useInitSlice + 1)} aria-label="Name">
          <Icon icon="gg:chevron-right"/>
        </button>
      )
      buttons.push(
        <button className="paginationButton" key={"B"} onClick={()=>setGlobalState("NewsSetInitSlice",InitSlice.Pages)} aria-label="Name">
                    <Icon icon="gg:chevron-double-right" style={{transform:'scaleX(1)'}} />
        </button>
      )

    return buttons;
  };

  export default Management_universal_pagination; 