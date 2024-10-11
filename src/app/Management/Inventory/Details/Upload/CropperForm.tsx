import { Icon } from '@iconify/react'
import { Gallery } from 'components/Gallery/Gallery'
import React from 'react'
import ReactCrop from 'react-image-crop'

const CropperForm = ({useToggle_image_upload,previewCanvasRef,data,HideUpload,onImageLoad,imgRef,aspect,crop,setCrop, imgSrc, onSelectFile, scale, setScale, rotate, setRotate, completedCrop, setCompletedCrop,saveBase64}) => {
  return (
    <div className='POPImageUpload_cover' id="POPImageUpload_cover" style={{'transform':`scale(${useToggle_image_upload})`}}>
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
                height: completedCrop.width,
                display: 'none'
              }}
            />
          )}
        </div>
      </div>
      <div className='cropperControlsContainer_gallery'>
        <Gallery data={data}/>
      </div>
    </div>
  </div>
  )
}

export default CropperForm