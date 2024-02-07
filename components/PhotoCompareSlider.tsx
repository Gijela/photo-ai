import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface IPhotoSlider {
  originalUrl: string;
  fixedUrl: string;
}

export default function PhotoCompareSlider({
  originalUrl,
  fixedUrl,
}: IPhotoSlider) {
  return (
    <>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={originalUrl} />}
        itemTwo={<ReactCompareSliderImage src={fixedUrl} />}
        className="flex lg:w-[475px] rounded-2xl"
      />
    </>
  );
}
