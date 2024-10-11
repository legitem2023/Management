import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import Loading from 'components/LoadingAnimation/Loading';
import { GET_BRANDS, GET_CATEGORY, GET_PRODUCT_TYPES } from 'graphql/queries';
import React, { useState } from 'react'
import { setGlobalState, useGlobalState } from 'state';
import DataManager from 'utils/DataManager';
import Pagination from '../../Management_universal_pagination/Pagination';
import Tabs from '../../Management_ui/Tabs';
import InsertFormCategory from '@/app/Management/Settings/CCommands/InsertFormCategory';
import InsertFormProductType from '@/app/Management/Settings/PCommands/InsertFormProductType';
import InsertFormBrand from '@/app/Management/Settings/BCommands/InsertFormBrand';
import {UPDATE_CATEGORY_IMAGE} from 'graphql/Mutation';
const CPBSettings = () => {
    const Manager = new DataManager();

    const [useInitSlice] = useGlobalState("CurrentPage");
    const [ItemPerpage] = useGlobalState("ItemPerpage");
    const [useToggle,setToggle] = useState(0);
    const [useRender,setToRender] = useState("");
    const imgPath = '/Thumnail.png'
    const [useLoading,setLoading] = useState(false);


    const { data:Category, loading:Category_loading,refetch:CategoryRefetch } = useQuery(GET_CATEGORY);
    const { data:Product_Type, loading:Product_Type_loading,refetch:Product_TypeRefetch } = useQuery(GET_PRODUCT_TYPES);
    const { data:Brands, loading:Brands_loading,refetch:BrandRefetch } = useQuery(GET_BRANDS);

    const [update_category_image] = useMutation(UPDATE_CATEGORY_IMAGE,{
        onCompleted: (e) => {
            console.log(e);
            CategoryRefetch();
            setLoading(false);
        }
    });

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

    let itemsPerPage:any = ItemPerpage;
    let currentPage = useInitSlice;
  
    const totalItems = Category?.getCategory?.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedProducts =  Category?.getCategory?.slice((currentPage - 1) * itemsPerPage,currentPage * itemsPerPage);
    const handlePageChange = (page: number) => {
        setGlobalState('CurrentPage', page);
      };
    
      const handleShow = (e:any) =>{
        setToRender(e.currentTarget.getAttribute("aria-label"));
        setToggle(1);

        setGlobalState("brandFormInsert", (prevData) => ({...prevData,"ProductType": e.currentTarget.getAttribute("aria-current")}))
        setGlobalState("productTypeFormInsert", (prevData) => ({...prevData,"Category": e.currentTarget.getAttribute("aria-current")}))

      }

      const handleImageChange = (e:any) =>{
        setLoading(true);
        const file = e.target.files[0];
        const id = e.target.getAttribute("aria-label");
        if (file) {
            const reader:any = new FileReader();
            reader.onloadend = () => {
                update_category_image({
                    variables:{
                        "uploadCategoryImageId": id,
                        "image": reader.result
                    }
                })
            };
            reader.readAsDataURL(file);
          }
      }
    return (
        <div className='SettingsContainer'>
            <div className='SettingsContainer_1'>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                <div className='Universal_cover' style={{'transform':`scale(${useToggle})`}}>
                <Icon icon="eva:close-square-fill" 
                        style={{color: '#ff0000',fontSize:'40px',cursor:'pointer',position:'absolute',top:'10px',right:'10px'}} 
                        onClick={() => setToggle(0)}/>
                        {useRender==='Category'?(<InsertFormCategory CategoryRefetch={CategoryRefetch}/>):
                         useRender==='ProductType'?<InsertFormProductType Product_TypeRefetch={Product_TypeRefetch}/>:
                         useRender==='Brandname'?<InsertFormBrand BrandRefetch={BrandRefetch}/>:""
                         }
                </div>
                <Icon icon="icon-park-solid:add" className='addPtype' aria-label='Category' onClick={(e:any) => handleShow(e)}/>
                <div className='SettingsCategory'>
                    <div className='SettingsCategoryDiv'>Image</div>
                    <div className='SettingsCategoryDiv'>Category</div>
                    <div className='SettingsCategoryDiv'>Status</div>
                    <div className='SettingsCategoryDiv'>Product Type</div>
                </div>
                {
                    paginatedProducts.map((item: any,idx:number) => (
                        <div key={item.id} className='SettingsCategory_grid'>
                            <div>
                                <label htmlFor={"img"+idx}>
                                    {useLoading?(<Icon icon="eos-icons:loading" width={100} height={"auto"}/>):(<img src={item.image===null?imgPath:item.image} width={100} height={"auto"}/>)}
                                </label>                            
                                <input type='file' className='hidden' aria-label={item.id} onChange={(e: any) => handleImageChange(e)} name={"img"+idx} id={"img"+idx}/>
                            </div>
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
                                <Icon icon="icon-park-solid:add" className='addPtype' aria-current={item.Name} aria-label="ProductType" onClick={(e:any) => handleShow(e)}/>
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
                                                <Icon icon="icon-park-solid:add" className='addBrand' aria-current={Proditem.Name} aria-label='Brandname' onClick={(e:any) => handleShow(e)}/>
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

export default CPBSettings