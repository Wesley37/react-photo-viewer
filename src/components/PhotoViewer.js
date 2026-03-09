import React, { useState } from 'react';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const PhotoViewer = () => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div>
      <IconButton
        size="large"
        color="inherit"
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        <AddAPhotoIcon fontSize='large' />
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
        />
      </IconButton>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {images.map((image, index) => (
          <div key={index} style={{ margin: 'auto' }}>
            <img
              src={image}
              alt={`Uploaded ${index}`}
              style={{ width: '230px', height: '230px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => openLightbox(index)}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[currentIndex]}
          nextSrc={images[(currentIndex + 1) % images.length]}
          prevSrc={images[(currentIndex + images.length - 1) % images.length]}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={goToPrevious}
          onMoveNextRequest={goToNext}
        />
      )}
    </div>
  );
};

export default PhotoViewer;