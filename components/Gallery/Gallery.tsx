import React, { useMemo } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import DataManager from 'utils/DataManager';
import Link from 'next/link';
import { useGlobalState } from 'state';
import { GET_CATEGORY, GET_INVENTORY_SUB_IMAGES } from 'graphql/queries';
import { useQuery } from '@apollo/client';

export const Gallery = () => {
  const manager = useMemo(() => new DataManager(), []);
  const path = process.env.NEXT_PUBLIC_PATH;
  const [urlData] = useGlobalState('urlData');

  const imagepath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;
  const { data: Category, loading: categoryLoading, error: categoryError } = useQuery(GET_CATEGORY);
  const { data: ImageData, loading: imageLoading, error: imageError } = useQuery(GET_INVENTORY_SUB_IMAGES)

  const position = 'right';

  // Ensure hooks are not conditionally called
  const filteredImageData = useMemo(() => {
    if (urlData) {
      return ImageData?.getInv_subImage.filter((item) => item.subImageRelationChild === urlData);
    }
    return ImageData?.getInv_subImage;
  }, [ImageData, urlData]);

  const images = useMemo(() => {
    return filteredImageData?.map((item, idx) => ({
      original: item.ImagePath ? `${imagepath}${item.ImagePath}` : `${path}image/Legitem-svg.svg`,
      thumbnail: item.ImagePath ? `${imagepath}${item.ImagePath}` : `${path}image/Legitem-svg.svg`,
      description: <Link href={`${path}Products/?Store=${item.id}`}>{item.Name}</Link>,
      alt: `Image ${idx + 1}`,
      title: item.Name,
      ariaLabel: `Image ${idx + 1}`,
      isVideo: true
    })) || [];
  }, [filteredImageData, imagepath, path]);

  // Handle loading and error states early
  if (categoryLoading || imageLoading) return null;
  if (categoryError || imageError) return null;

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
