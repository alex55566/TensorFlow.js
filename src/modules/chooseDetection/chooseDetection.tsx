import { Detections } from "@/enum/detections";

export function ChooseDetection({
  handleClick,
}: {
  handleClick: (detection: Detections) => void;
}) {
  return (
    <div className="App">
      <button
        onClick={() => {
          handleClick(Detections.FaceMask);
        }}
      >
        Детектор маски лица
      </button>
      <button
        onClick={() => {
          handleClick(Detections.Body);
        }}
      >
        Детектор тела
      </button>
      <button
        onClick={() => {
          handleClick(Detections.AgeEmoGen);
        }}
      >
        Детектор гендера, возраста и эмоций
      </button>
    </div>
  );
}
