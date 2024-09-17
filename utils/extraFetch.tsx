export const category = (defaultval: any, index: any,Category:any,event:any) => {
    // if (!Category) return
    return (
      <select defaultValue={defaultval} id={"category" + index} onChange={(e: any) => event(e)} aria-current={index}>
        <option value='Select Category'>Select Category</option>
        {Category.getCategory.map((item: any, idx: any) => (
          <option value={item.Name} key={idx}>{item.Name}</option>
    ))}</select>
    )
  }

export const status = (defaultval: any, index: any,event:any) => {
    return (
      <select defaultValue={defaultval} id={"status" + index} onChange={(e: any) => event(e)} aria-current={index}>
        <option value='Select Status'>Select Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    )
  }

 export const productType = (defaultval: any, index: any, Product_Type:any,event:any) => {
    if (!Product_Type) return
    return (<select defaultValue={defaultval} id={"Ptype" + index} onChange={(e: any) => event(e)} aria-current={index}>
      <option value='Select Product Type'>Select Product Type</option>
      {Product_Type.getProductTypes.map((item: any, idx: any) => (
        <option key={idx} value={item.name}>{item.Name}</option>
      ))}
    </select>)
  }
  export const productBrand = (defaultval: any, index: any,Brands:any,event:any) => {
    if (!Brands) return
    return (<select defaultValue={defaultval} id={"brand" + index} onChange={(e: any) => event(e)} aria-current={index}>
      <option value='Select Product Brand'>Select Product Brand</option>
      {Brands.getBrand.map((item: any, idx: any) => (
        <option key={idx} value={item.Name}>{item.Name}</option>
      ))}
    </select>)
  }
  export const fallbackImage = () =>{
    const path = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    return `${path}/Thumbnail.png`;
  }
  
  export const imageSource = (item:any) =>{
    const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    return item?.thumbnail ? `${imgPath}${item.thumbnail}` : fallbackImage()
  }
  