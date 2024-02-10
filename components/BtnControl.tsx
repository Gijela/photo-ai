import downloadPhoto from "../utils/downloadPhoto";
import appendNewToName from "../utils/appendNewToName";

interface IBtnControl {
  processedUrl: string | null;
  photoName: string | null;
  resetUrlToNull: () => void;
  uploadCss?: string;
  downloadCss?: string;
}

export default function BtnControl({
  processedUrl,
  photoName,
  resetUrlToNull,
  uploadCss,
  downloadCss,
}: IBtnControl) {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start text-xl m-auto lg:m-0">
      <button
        onClick={resetUrlToNull}
        className={`bg-blue-500 rounded-full text-white font-medium px-4 py-2 hover:bg-blue-500/80 transition ${uploadCss}`}
      >
        上传新图片
      </button>
      <button
        disabled={!processedUrl}
        onClick={() => {
          photoName && downloadPhoto(processedUrl!, appendNewToName(photoName));
        }}
        className={`bg-white rounded-full text-black font-medium px-4 py-2 hover:bg-gray-100 transition border ${downloadCss}`}
      >
        下载图片
      </button>
    </div>
  );
}

// ml-2 lg:ml-4 mt-4 lg:mt-0
