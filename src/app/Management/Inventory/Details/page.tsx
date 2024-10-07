"use client";

import React, { useEffect, useRef, useState, Suspense } from 'react';
import DataManager from 'utils/DataManager';
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader';
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer';
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation';
import { Icon } from '@iconify/react';
import { GET_CHILD_INVENTORY_DETAIL, SAVE_CROP_IMAGE } from 'graphql/queries';
import { UPDATE_CHILD_INVENTORY, DELETE_CHILD_INVENTORY } from 'graphql/Mutation';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { setGlobalState, useGlobalState } from 'state';
import { Gallery } from 'components/Gallery/Gallery';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import { canvasPreview } from './Upload/canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import 'react-image-crop/dist/ReactCrop.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Manament_inventory_detail from 'components/Management/Management_inventory/Manament_inventory_detail/Manament_inventory_detail';
import Loading from 'components/LoadingAnimation/Loading';
import InsertForm from './InsertForm';
import EditForm from './EditForm';
import CropperForm from './Upload/CropperForm';

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
  );
}

const Inventory = () => {
  const [useToggle, setToggle] = useState(0);
  const [useToggleInsert, setToggleInsert] = useState(0);
  const [useToggle_image_upload, setToggle_image_upload] = useState(0);
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [useEmail, setEmail] = useState('');
  // const searchParams = useSearchParams();

  const [message] = useGlobalState('message');
  const [aspect, setAspect] = useState<number | undefined>(16 / 12);
  const [useItemId] = useGlobalState('setItemID');
  const [managementUrlData] = useGlobalState('managementUrlData');
  const [managementUrlDataName] = useGlobalState('managementUrlDataName');
  const [managementUrlDataCategory] = useGlobalState('managementUrlDataCategory');
  const [managementUrlDataProductType] = useGlobalState('managementUrlDataProductType');
  const [managementUrlDataProductBrand] = useGlobalState('managementUrlDataProductBrand');

  const path = process.env.NEXT_PUBLIC_PATH;
  const Manager = new DataManager();
  const [activate, setActivation] = React.useState(false);
  const [useID, setID] = React.useState(0);

  const [UpdateChildInventory] = useMutation(UPDATE_CHILD_INVENTORY, {
    onCompleted: data => console.log(data),
  });

  const [DeleteChildInventory] = useMutation(DELETE_CHILD_INVENTORY, {
    onCompleted: data => {
      childinventory();
      Manager.Success(data.deleteChildInventory.statusText);
      return;
    },
  });

  var [saveCropBlob] = useMutation(SAVE_CROP_IMAGE, {
    onCompleted: data => {
      if(data.saveCropImage.statusText ==="Image saved successfully"){
        Manager.Success(data.saveCropImage.statusText);
      }
    }
  });

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
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  useEffect(() => {
    // Ensure window is defined before accessing it
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('style');
      const URLName = params.get('Name');
      const URLProductType = params.get('ProductType');
      const URLCategory = params.get('Category');
      const URLBrand = params.get('Brand');
      setGlobalState('managementUrlDataName', URLName);
      setGlobalState('managementUrlData', code);
      setGlobalState('managementUrlDataCategory', URLCategory);
      setGlobalState('managementUrlDataProductType', URLProductType);
      setGlobalState('managementUrlDataProductBrand', URLBrand);
    }
    return () => {};
  }, []);

  const { data, loading, error, refetch: childinventory } = useQuery(GET_CHILD_INVENTORY_DETAIL, {
    variables: { styleCode: managementUrlData },
  });

  if (loading) return <Loading />;
  if (error) return <p>{error.toString()}</p>;

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || ''),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function ShowUpload(e: any) {
    // console.log(e);
    setGlobalState('setItemID',e);
    setToggle_image_upload(1);
  }

  function HideUpload(e: any) {
    setToggle_image_upload(0);
  }

  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;

  const saveBase64 = () => {
    var canvas = (document.getElementById('myCanvas') as HTMLCanvasElement);
    var dataURL = canvas.toDataURL('image/webp');

    console.log(useItemId)

    const JSON = {
      'saveCropImageId': useItemId,
      'file': dataURL,
    };
    saveCropBlob({
      variables: JSON,
    });
  };

  const HandleDelete = (id: number) => {
    const conf = confirm('Are you sure you want to delete this item?');
    if (!conf) return;
    DeleteChildInventory({
      variables: { deleteChildInventoryId: id },
    });
    return;
  };

  const setFormClear = () => {
    const setForm = {
      Color: '',
      Size: '',
      Price: '',
      Stock: '',
      Description: '',
    };
    setGlobalState('invFormDetailDataAdd', setForm);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className='Main'>
        <div className='ManagementBody'>
          <ManagementHeader />
          <ManagementDrawer />
          <ManagementNavigation />
          <div className='Universal_cover' style={{ 'transform': `scale(${useToggle})` }}>
            <Icon
              icon="eva:close-square-fill"
              style={{ color: '#ff0000', fontSize: '40px', cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }}
              onClick={() => setToggle(0)}
            />
            <EditForm InventoryRefetch={childinventory} setToggle={setToggle} />
          </div>
          <div className='Universal_cover' style={{ 'transform': `scale(${useToggleInsert})` }}>
            <Icon
              icon="eva:close-square-fill"
              style={{ color: '#ff0000', fontSize: '40px', cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }}
              onClick={() => setToggleInsert(0)}
            />
            <InsertForm
              InventoryRefetch={childinventory}
              setToggleInsert={setToggleInsert}
              managementUrlData={managementUrlData}
              managementUrlDataName={managementUrlDataName}
              managementUrlDataCategory={managementUrlDataCategory}
              managementUrlDataProductType={managementUrlDataProductType}
              managementUrlDataProductBrand={managementUrlDataProductBrand}
            />
          </div>

          <div className='ManagementMainMenu'>
            <ToastContainer />
            <div className='Menu_label_management'><Icon icon='material-symbols:inventory-sharp' /> Inventory</div>
            <div className='InventoryTable_child'>
              <Link href={path + "Management/Inventory"} className='Management_icon'>
                <Icon icon="ic:sharp-double-arrow" rotate={2} /> Back
              </Link>
              <button
                className='addNewItemButton'
                onClick={() => { setToggleInsert(1); setFormClear(); }}
                aria-label="Name"
              >
                <Icon icon="ic:round-add-box" className="addNewItem" />
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
              <Manament_inventory_detail
                data={data.getChildInventory_details}
                setToggle={setToggle}
                ShowUpload={ShowUpload}
                HandleDelete={HandleDelete}
              />
              <CropperForm
                useToggle_image_upload={useToggle_image_upload}
                previewCanvasRef={previewCanvasRef}
                data={data}
                HideUpload={HideUpload}
                onImageLoad={onImageLoad}
                imgRef={imgRef}
                aspect={aspect}
                crop={crop}
                setCrop={setCrop}
                imgSrc={imgSrc}
                onSelectFile={onSelectFile}
                scale={scale}
                setScale={setScale}
                rotate={rotate}
                setRotate={setRotate}
                completedCrop={completedCrop}
                setCompletedCrop={setCompletedCrop}
                saveBase64={saveBase64}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Inventory;
