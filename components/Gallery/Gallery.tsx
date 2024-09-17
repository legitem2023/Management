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

  const position = 'right';

  const filteredImageData = useMemo(() => {
      return selected_style.data.getChildInventory_details;
  }, [selected_style, urlData]);

  const images = useMemo(() => {
    return filteredImageData?.map((item, idx) => ({
      original: imageSource(item),
      thumbnail:imageSource(item),
      description: <Link href={`${path}Products/?Store=${item.id}`}>{item.Name}</Link>,
      alt: `Image ${idx + 1}`,
      title: item.Name,
      ariaLabel: `Image ${idx + 1}`,
      isVideo: true
    })) || [];
  }, [filteredImageData, imagepath, path]);

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
