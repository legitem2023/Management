"use client"
import React, { useEffect, useRef, useState } from 'react'
import DataManager from 'utils/DataManager'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import { Icon } from '@iconify/react'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import { GET_CHILD_INVENTORY_DETAIL, SAVE_CROP_IMAGE } from 'graphql/queries'

import { UPDATE_CHILD_INVENTORY } from 'graphql/Mutation'

import { useMutation, useQuery } from '@apollo/client'
import TimestampConverter from 'components/timestamp/TimestampConverter'
import Link from 'next/link'
import { setGlobalState, useGlobalState } from 'state'

import { Gallery } from 'components/Gallery/Gallery';
import { Token } from 'utils/cookie';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import { canvasPreview } from './Upload/canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Management_inventory from 'components/Management/Management_inventory/Management_inventory'
import Manament_inventory_detail from 'components/Management/Management_inventory/Manament_inventory_detail/Manament_inventory_detail'
import Loading from 'components/LoadingAnimation/Loading'
import InsertForm from './InsertForm'
import EditForm from './EditForm'
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
  const [useToggle,setToggle] = useState(0);
  const [useToggleInsert,setToggleInsert] = useState(0)

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
  const { data, loading, error,refetch:childinventory } = useQuery(GET_CHILD_INVENTORY_DETAIL, {
    variables: { styleCode: managementUrlData },
  });
  if (loading) return <Loading/>;
  if (error) return <p>{error.toString()}</p>;

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

        <div className='Universal_cover' style={{'transform':`scale(${useToggle})`}}>
          <Icon icon="eva:close-square-fill" 
                style={{color: '#ff0000',fontSize:'40px',cursor:'pointer',position:'absolute',top:'10px',right:'10px'}} 
                onClick={() => setToggle(0)}/>
            <EditForm InventoryRefetch={childinventory}/>
        </div>
        <div className='Universal_cover' style={{'transform':`scale(${useToggleInsert})`}}>
          <Icon icon="eva:close-square-fill" 
                style={{color: '#ff0000',fontSize:'40px',cursor:'pointer',position:'absolute',top:'10px',right:'10px'}} 
                onClick={() => setToggleInsert(0)}/>
            <InsertForm  InventoryRefetch={childinventory}/>
        </div>

        <div className='ManagementMainMenu'>
          <ToastContainer />
          <div className='Menu_label_management'><Icon icon='material-symbols:inventory-sharp' /> Inventory</div>
          <div className='InventoryTable_child'>
            <Link href={path + "Management/Inventory"} className='Management_icon'><Icon icon="ic:sharp-double-arrow" rotate={2} /> Back</Link>
            <button className='addNewItemButton' onClick={()=>setToggleInsert(1)} aria-label="Name">
              <Icon icon="ic:round-add-box" className="addNewItem"/>
            </button>
            
            <div className='InventoryHead_child'>
              <div>Image</div>
              <div>Product Code</div>
              <div>Product Name</div>
              <div>Color</div>
              <div>Size</div>
              <div>Price</div>
              <div>Stock</div>
              <div>Status</div>
              <div>Date</div>
              <div>Editor</div>
              <div>Action</div>
            </div>
            <Manament_inventory_detail data={data.getChildInventory_details} setToggle={setToggle}/>
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