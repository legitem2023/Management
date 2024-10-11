import React, { useMemo } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import DataManager from 'utils/DataManager';
import Link from 'next/link';
import { useGlobalState } from 'state';
import { imageSource } from 'utils/triggers';


export const Gallery = (selected_style:any) => {
  const manager = useMemo(() => new DataManager(), []);
  const path = process.env.NEXT_PUBLIC_PATH;
  const [urlData] = useGlobalState('urlData');

  const imagepath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;

  const position = 'bottom';

  const filteredImageData = useMemo(() => {
      return selected_style.data.getChildInventory_details;
  }, [selected_style, urlData]);


  const imagesSub = useMemo(() =>{
    return filteredImageData[0].subImageFieldOut
  },[])


  const images = useMemo(() => {
    return imagesSub?.map((item, idx) => ({
      original: item.ImagePath,
      thumbnail: item.ImagePath,
      description: <Link href={`${path}Products/?Store=${item.id}`}>{item.Name}</Link>,
      alt: `Image ${idx + 1}`,
      title: item.Name,
      ariaLabel: `Image ${idx + 1}`,
      isVideo: true
    })) || [];
  }, [imagesSub, imagepath, path]);

  return (
    <ImageGallery
      items={images}
      showBullets
      thumbnailPosition={position}
      showNav={true}
      lazyLoad={true}
      autoPlay={true}
      infinite={true}
      useTranslate3D={true}
    />
  );
};
