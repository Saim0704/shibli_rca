import { Image } from 'antd';
import React from 'react';

export interface IHomeCarouselProps {
  alt: string;
  url: string;
}

const MainCarousel: React.FC<IHomeCarouselProps> = ({ alt, url }) => {
  return (
    <>
      <div className='max-h-[700px] text-center relative'>
        <Image
          preview={false}
          src={url}
          alt={alt}
          style={{
            width: '100vw',
            objectFit: 'fill',
            objectPosition: 'center',
          }}
        />
      </div>
    </>
  );
};

export default MainCarousel;
