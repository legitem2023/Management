import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState } = createGlobalState({
    thumbtake: 10,
    thumbskip: 0,
    relatedtake: 10,
    relatedskip: 0,
    editingMode: false,
    urlData: 0,
    managementUrlData: "",
    rowNumber: 0,
    setInitSlice: 1,
    fromDate: null,
    toDate: null,
    ItemPerpage: "10",
    AgentPerpage: "Select Email Address",
    // setInitSlice:"0",
    setItemID: 0,
    message: "",
    useEmail: "",
    useLevel: "",
    Management: [],
    cookieEmailAddress: "",
    cookieUserLevel: "",
    cookieActiveUser: "",
    thumbnailSearch: "",
    thumbnailData: null,
    thumbnailCategory: null,
    descAsc: null,
    activeModel: "http://localhost:3000/models/NoModel.glb"
});
export { useGlobalState, setGlobalState };
