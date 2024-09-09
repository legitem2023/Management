"use client"
import React, { useEffect, useRef, useState } from 'react'
import DataManager from 'utils/DataManager'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import { Icon } from '@iconify/react'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import { GET_CHILD_INVENTORY_DETAIL, SAVE_CROP_IMAGE, UPDATE_CHILD_INVENTORY } from 'graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import TimestampConverter from 'components/timestamp/TimestampConverter'
import Link from 'next/link'
import { setGlobalState, useGlobalState } from 'state'

import { Gallery } from 'components/Gallery/Gallery';
import { Token } from 'utils/cookie';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}


const Inventory = () => {

  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [useEmail, setEmail] = useState("")


  const [message] = useGlobalState("message");


  const [aspect, setAspect] = useState<number | undefined>(16 / 12)
  const [useItemId] = useGlobalState("setItemID");
  const [managementUrlData] = useGlobalState("managementUrlData");
  const path = process.env.NEXT_PUBLIC_PATH
  const Manager = new DataManager();
  const [activate, setActivation] = React.useState(false)
  const [useID, setID] = React.useState(0)
  
  const [UpdateChildInventory] = useMutation(UPDATE_CHILD_INVENTORY, {
    onCompleted: data => console.log(data)
  })

  var [saveCropBlob] = useMutation(SAVE_CROP_IMAGE, {
    onCompleted: data => console.log(data)
  })

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  useEffect(() => {
    // const token:any = cookies();
    // setEmail(token.email);
    const windata = typeof window !== undefined ? window.location.search : "";
    const urlParams = new URLSearchParams(windata);
    const code: any = urlParams.get('style');
    setGlobalState("managementUrlData", code);
  }, [])
  const { data, loading, error } = useQuery(GET_CHILD_INVENTORY_DETAIL, {
    variables: { styleCode: managementUrlData },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!data) return null;
  const activateEdit = (e: any) => {
    let checkbox: any = e.target.getAttribute("aria-current");
    setID(checkbox)
    setActivation(e.target.checked)
    if (e.target.checked) {
      setGlobalState("editingMode", true)
      setGlobalState("rowNumber", e.target.getAttribute("aria-label"));
    } else {
      setGlobalState("editingMode", false)
      setGlobalState("rowNumber", 0);

    }
  }

  const limitText = (text: any) => {
    return text.slice(0, 10) + (text.length > 10 ? "..." : "");
  }

  const status = (defaultval: any, index: any) => {
    return (
      <select defaultValue={defaultval} id={"DetproductStatus" + index} aria-current={index} onChange={(e) => handleEdit(e)}>
        <option value='Select Status'>Select Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    )
  }

  const handleEdit = (e: any) => {

    const id = e.target.getAttribute("aria-current");
    const productCode = (document.getElementById("DetproductCode" + id) as HTMLInputElement).value
    const productName = (document.getElementById("DetproductName" + id) as HTMLInputElement).value
    const productColor = (document.getElementById("DetproductColor" + id) as HTMLInputElement).value
    const productSize = (document.getElementById("DetproductSize" + id) as HTMLInputElement).value
    const productPrice = (document.getElementById("DetproductPrice" + id) as HTMLInputElement).value
    const productStock = (document.getElementById("DetproductStock" + id) as HTMLInputElement).value
    const productStatus = (document.getElementById("DetproductStatus" + id) as HTMLInputElement).value
    const JSON = {
      "productId": parseInt(id),
      "productCode": productCode,
      "productName": productName,
      "productColor": productColor,
      "productSize": productSize,
      "productPrice": productPrice,
      "productStatus": productStatus,
      "productStock": productStock,
      "email": useEmail
    }

    UpdateChildInventory({
      variables: JSON,
      refetchQueries: [{
        query: GET_CHILD_INVENTORY_DETAIL,
        variables: {
          styleCode: managementUrlData
        }
      }]
    })
    console.log(JSON);
  }
  //##############################################################################################################

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }


  function ShowUpload(e: any) {
    const id = parseInt(e.target.getAttribute("aria-current"));
    setGlobalState("setItemID", id);
    setGlobalState("urlData", id);
    (document.getElementById("POPImageUpload_cover") as HTMLDivElement).style.transform = 'scale(1)';
  }

  function HideUpload(e: any) {
    const id = parseInt(e.target.getAttribute("aria-current"));
    setGlobalState("setItemID", 0);
    (document.getElementById("POPImageUpload_cover") as HTMLDivElement).style.transform = 'scale(0)';
  }
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;

  const saveBase64 = () => {
    var canvas = (document.getElementById('myCanvas') as HTMLCanvasElement);
    var dataURL = canvas.toDataURL('image/webp');
    console.log(typeof useItemId);
    const JSON = {
      "saveCropImageId": useItemId,
      "file": dataURL,
    }
    saveCropBlob({
      variables: JSON
    })
    Manager.Promise("Image successfully Uploaded!")
    //return setGlobalState("message","Image successfully Uploaded!");

  }
  //##############################################################################################################
  return (
    <div className='Main'>
      <div className='ManagementBody'>
        <ManagementHeader />
        <ManagementDrawer />
        <ManagementNavigation />
        <div className='ManagementMainMenu'>
          <ToastContainer />
          <div className='Menu_label_management'><Icon icon='material-symbols:inventory-sharp' /> Inventory</div>
          <ManagementSearch />
          <div className='InventoryTable_child'>
            <Link href={path + "Management/Inventory"} className='Management_icon'><Icon icon="ic:sharp-double-arrow" rotate={2} /> Back</Link>
            <div className='InventoryHead_child'>
              <div>Image</div>
              <div>Product Code</div>
              <div>Product Name</div>
              <div>Color</div>
              <div>Size</div>
              <div>Price</div>
              <div>Stock</div>
              <div>Status</div>
              <div>Date Created</div>
              <div>Date Edited</div>
              <div>Creator</div>
              <div>Editor</div>
              <div>Action</div>
            </div>
            {data.getChildInventory_details.map((item: any, idx: any) => (
              <div key={idx} className='InventoryBody_child'>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
                  <label>
                    <input type="checkbox" id={"edit" + item.id} className='hidden' aria-current={item.id} aria-label={idx + 1} onChange={activateEdit}></input>
                    <Icon icon="bxs:edit" className='management_edit' />
                  </label>
                  <label>
                    <Image src={item.thumbnail === '' || item.thumbnail === null ? path + 'image/Legitem-svg.svg' : imgPath + item.thumbnail} alt={item.id} height='60' width='80' aria-current={item.id} onClick={(e: any) => ShowUpload(e)} />
                  </label>

                </div>
                <div className='InventoryBodyCell '>{activate === true ? "DetproductCode" + useID === "DetproductCode" + item.id ? <input type='text' aria-current={item.id} onChange={(e) => handleEdit(e)} defaultValue={item.productCode} placeholder="Code..." id={'DetproductCode' + item.id}></input> : item.productCode === null || item.productCode === "" ? "Code..." : item.productCode : item.productCode === null || item.productCode === "" ? "Code..." : item.productCode}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "DetproductName" + useID === "DetproductName" + item.id ? <input type='text' aria-current={item.id} onChange={(e) => handleEdit(e)} defaultValue={item.name} placeholder="Name..." id={'DetproductName' + item.id}></input> : item.name === null || item.name === "" ? "Name..." : item.name : item.name === null || item.name === "" ? "Name..." : item.name}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "DetproductColor" + useID === "DetproductColor" + item.id ? <input type='text' aria-current={item.id} onChange={(e) => handleEdit(e)} defaultValue={item.color} placeholder="Color..." id={'DetproductColor' + item.id}></input> : item.color === null || item.color === "" ? "Color..." : item.color : item.color === null || item.color === "" ? "Color..." : item.color}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "DetproductSize" + useID === "DetproductSize" + item.id ? <input type='text' aria-current={item.id} onChange={(e) => handleEdit(e)} defaultValue={item.size} placeholder="Size..." id={'DetproductSize' + item.id}></input> : item.size === null || item.size === "" ? "Size..." : item.size : item.size === null || item.size === "" ? "Size..." : item.size}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "DetproductPrice" + useID === "DetproductPrice" + item.id ? <input type='number' aria-current={item.id} onChange={(e) => handleEdit(e)} defaultValue={item.price} placeholder="Price..." id={'DetproductPrice' + item.id}></input> : item.price === null || item.price === "" ? "Price..." : item.price : item.price === null || item.price === "" ? "Price..." : item.price}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "DetproductStock" + useID === "DetproductStock" + item.id ? <input type='number' aria-current={item.id} onChange={(e) => handleEdit(e)} defaultValue={item.stock} placeholder="Stock..." id={'DetproductStock' + item.id}></input> : item.stock === null || item.stock === "" ? "Stock..." : item.stock : item.stock === null || item.stock === "" ? "Stock..." : item.stock}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{activate === true ? "DetproductStatus" + useID === "DetproductStatus" + item.id ? status(item.status, item.id) : item.status === null || item.status === "" ? "Select Status..." : item.status : item.status === null || item.status === "" ? "Select Status..." : item.status}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
                  <p><TimestampConverter timestamp={item.dateCreated} /></p>
                  <br></br>
                  <p><TimestampConverter timestamp={item.dateUpdated} /></p>
                  
                </div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}></div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>{limitText(item.creator)}<br></br>{limitText(item.editor)}</div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}></div>
                <div className={'InventoryBodyCell' + ' InventoryBodyCell' + item.id}>
                  <Icon icon="material-symbols:delete-sharp" className='management_delete' />
                  <Icon icon="carbon:view-filled" />
                </div>
              </div>
            ))}
            <div className='POPImageUpload_cover' id="POPImageUpload_cover">
              <Icon icon="zondicons:close-solid" className='ClosePOPImageUpload_cover' onClick={(e: any) => HideUpload(e)} />
              <div className='POPImageUpload'>
                <div className='cropperControlsContainer'>
                  <div className="Crop-Controls">
                    <div>
                      <input type="file" accept="image/*" onChange={onSelectFile} />
                    </div>
                    <div>
                      <label htmlFor="scale-input"><Icon icon="icon-park-outline:scale" /> </label>
                      <input
                        id="scale-input"
                        type="range"
                        step="0.0001"
                        max='2'
                        value={scale}
                        min='1'
                        disabled={!imgSrc}
                        onChange={(e) => setScale(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label htmlFor="rotate-input"><Icon icon="material-symbols:rotate-right" /> </label>
                      <input
                        id="rotate-input"
                        type="range"
                        step="0.0001"
                        value={rotate}
                        disabled={!imgSrc}
                        onChange={(e) =>
                          setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                        }
                      />
                    </div>
                    <div>
                      <button onClick={saveBase64}>
                        Save <Icon icon="material-symbols:save-sharp" />
                      </button>
                    </div>

                  </div>
                  <div className='CropperImageContrainer'>
                    {Boolean(imgSrc) && (
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                      >
                        <img
                          ref={imgRef}
                          alt="Crop me"
                          src={imgSrc}
                          style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, height: '40vh' }}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                    )}
                  </div>
                  <div>
                    {Boolean(completedCrop) && (
                      <canvas
                        ref={previewCanvasRef}
                        id='myCanvas'
                        style={{
                          border: '1px solid black',
                          objectFit: 'contain',
                          width: completedCrop.width,
                          height: completedCrop.height,
                          display: 'none'
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className='cropperControlsContainer_gallery'>
                  <Gallery />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='popNotification' id="popNotification">Image Successfuly Uploaded!</div> */}
    </div>
  )
}

export default Inventory