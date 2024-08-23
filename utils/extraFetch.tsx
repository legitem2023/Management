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