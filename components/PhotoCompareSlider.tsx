import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface IPhotoSlider {
  originalUrl: string;
  processedUrl: string;
  compareSliderCSS?: string;
}

export default function PhotoCompareSlider({
  originalUrl,
  processedUrl,
  compareSliderCSS,
}: IPhotoSlider) {
  return (
    <>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={originalUrl} />}
        itemTwo={<ReactCompareSliderImage src={processedUrl} />}
        className={`rounded-2xl ${compareSliderCSS}`}
      />
    </>
  );
}
