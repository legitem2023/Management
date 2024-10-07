import { setGlobalState } from "state"

// export const category = (defaultval: any, index: any,Category:any,event:any) => {
//     // if (!Category) return
//     return (
//       <select defaultValue={defaultval} id={"category" + index} onChange={(e: any) => event(e)} aria-current={index}>
//         <option value='Select Category'>Select Category</option>
//         {Category.getCategory.map((item: any, idx: any) => (
//           <option value={item.Name} key={idx}>{item.Name}</option>
//     ))}</select>
//     )
//   }

// export const status = (defaultval: any, index: any,event:any) => {
//     return (
//       <select defaultValue={defaultval} id={"status" + index} onChange={(e: any) => event(e)} aria-current={index}>
//         <option value='Select Status'>Select Status</option>
//         <option value="Active">Active</option>
//         <option value="Inactive">Inactive</option>
//       </select>
//     )
//   }

//  export const productType = (defaultval: any, index: any, Product_Type:any,event:any) => {
//     if (!Product_Type) return
//     return (<select defaultValue={defaultval} id={"Ptype" + index} onChange={(e: any) => event(e)} aria-current={index}>
//       <option value='Select Product Type'>Select Product Type</option>
//       {Product_Type.getProductTypes.map((item: any, idx: any) => (
//         <option key={idx} value={item.name}>{item.Name}</option>
//       ))}
//     </select>)
//   }
//   export const productBrand = (defaultval: any, index: any,Brands:any,event:any) => {
//     if (!Brands) return
//     return (<select defaultValue={defaultval} id={"brand" + index} onChange={(e: any) => event(e)} aria-current={index}>
//       <option value='Select Product Brand'>Select Product Brand</option>
//       {Brands.getBrand.map((item: any, idx: any) => (
//         <option key={idx} value={item.Name}>{item.Name}</option>
//       ))}
//     </select>)
//   }
  export const fallbackImage = () =>{
    const path = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    return `${path}/Thumbnail.png`;
  }
  
  export const imageSource = (item:any) =>{
    const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    return item?.thumbnail ? `${item.thumbnail}` : fallbackImage()
  }
  
  export const replaceOembedWithIframe = (htmlContent) =>{
    if (!htmlContent) return '';
  
    // Regular expression to detect <oembed> tags with YouTube URLs
    const oembedRegex = /<oembed url="https:\/\/youtu\.be\/(.*)"><\/oembed>/g;
  
    // Replace <oembed> with corresponding <iframe>
    const updatedContent = htmlContent.replace(
      oembedRegex,
      (match, videoId) => {
        // Return the iframe for YouTube videos
        return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }
    );
  
    return updatedContent;
  }

  export const ClearState = () =>{
    setGlobalState("ItemPerpage",10);
    setGlobalState("CurrentPage",1);
    setGlobalState("setInitSlice",1);
    setGlobalState("productCategory","Select Category");
    setGlobalState("productType","Select Product Type");
    setGlobalState("productBrand","Select Product Brand");

  }

  export const ClearStorage = (DeleteState:any,name:string) =>{
    localStorage.removeItem(name);
    DeleteState(0);
  }
  