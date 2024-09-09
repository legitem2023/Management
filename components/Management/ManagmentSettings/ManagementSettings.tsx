import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import Loading from 'components/LoadingAnimation/Loading';
import { GET_BRANDS, GET_CATEGORY, GET_PRODUCT_TYPES } from 'graphql/queries';
import React from 'react'
import DataManager from 'utils/DataManager';
const ManagementSettings = () => {
    const Manager = new DataManager();
    const { data:Category, loading:Category_loading } = useQuery(GET_CATEGORY);
    const { data:Product_Type, loading:Product_Type_loading } = useQuery(GET_PRODUCT_TYPES);
    const { data:Brands, loading:Brands_loading } = useQuery(GET_BRANDS);

    if (Category_loading) return <Loading/>;
    if (Product_Type_loading) return <Loading/>;
    if (Brands_loading) return <Loading/>;

    const collapseProdType = (e: any) => {
        const id = e.target.getAttribute("aria-label");
        const collapseElement = document.getElementById("collapseProdTypeCont" + id) as HTMLDivElement;
        if (e.target.checked) {
            collapseElement.style.minHeight = collapseElement.scrollHeight + "px";
            collapseElement.style.height = 'auto';//collapseElement.scrollHeight + "px";
        } else {
            collapseElement.style.minHeight = "0px";
            collapseElement.style.height = "0px";
        }
    };

    const collapseBrand = (e: any) => {
        const id = e.target.getAttribute("aria-label");
        const collapseElement = document.getElementById("collapse_Brand" + id) as HTMLDivElement;
        if (e.target.checked) {
            collapseElement.style.overflow = "auto";
            collapseElement.style.maxHeight = collapseElement.scrollHeight + "px";
        } else {
            collapseElement.style.overflow = "hidden";
            collapseElement.style.maxHeight = "0px";
        }
    };

    return (
        <div className='SettingsContainer'>
            <div className='SettingsContainer_1'>
                <button>Category</button>

                <div className='SettingsCategory'>
                    <div className='SettingsCategoryDiv'>Category</div>
                    <div className='SettingsCategoryDiv'>Status</div>
                    <div className='SettingsCategoryDiv'>Product Type</div>
                </div>{
                    Category.getCategory.map((item: any) => (
                        <div key={item.id} className='SettingsCategory_grid'>
                            <div><input type='text' defaultValue={item.Name} /></div>
                            <div>
                                <select>
                                    <option>Select Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={"collapseProdType" + item.id} className='ProdTypeLabel'> Product Type  {Product_Type.getProductTypes.filter((pItem: any) => { return pItem.Category === item.Name }).length}<Icon icon="mdi:chevron-down-box" />
                                    <input type='checkbox' className="hidden" id={"collapseProdType" + item.id} aria-label={item.id} onChange={(e: any) => collapseProdType(e)} />
                                </label>
                            </div>
                            <div className='SettingProductType' id={"collapseProdTypeCont" + item.id}>
                                <Icon icon="icon-park-solid:add" className='addPtype' aria-current={item.Name} />
                                <div className='SettingProductType_grid'>
                                    <div className='SettingProductType_grid_div'>Product Type</div><div className='SettingProductType_grid_div'>Brand</div>
                                </div>
                                {
                                    Product_Type.getProductTypes.filter((pItem: any) => { return pItem.Category === item.Name }).map((Proditem: any) => (
                                        <div key={Proditem.id} className='SettingProductType_grid'>
                                            <div className='SettingProductType_grid_spanded'>
                                            </div>
                                            <div><input type='text' defaultValue={Proditem.Name} /></div>
                                            <div>
                                                <label htmlFor={"collapseBrand" + Proditem.id} className='ProdTypeLabel'>
                                                    Brandname{Brands.getBrand.filter((bItem: any) => { return bItem.ProductType === Proditem.Name }).length}<Icon icon="mdi:chevron-down-box" />
                                                    <input type='checkbox' className="hidden" id={"collapseBrand" + Proditem.id} aria-label={Proditem.id} onChange={(e: any) => collapseBrand(e)} />
                                                </label>
                                            </div>
                                            <div className='SettingBrandName' id={"collapse_Brand" + Proditem.id}>
                                                <Icon icon="icon-park-solid:add" className='addBrand' aria-current={Proditem.Name} />
                                                {Brands.getBrand.filter((bItem: any) => { return bItem.ProductType === Proditem.Name }).map((BrandItem: any) => (
                                                    <div key={BrandItem.id}><input type='text' defaultValue={BrandItem.Name} /></div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                }</div>
                        </div>))
                }
            </div>
        </div>
    )
}

export default ManagementSettings