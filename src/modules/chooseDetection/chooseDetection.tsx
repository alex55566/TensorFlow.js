import { Detections } from "@/enum/detections";
import styles from "./ChooseDetection.module.scss";

export function ChooseDetection({
  handleClick,
}: {
  handleClick: (detection: Detections) => void;
}) {
  return (
    <div className={styles.container}>
      <button
        className="btn-green"
        onClick={() => {
          handleClick(Detections.FaceMask);
        }}
      >
        Детектор маски лица
      </button>
      <button
        className="btn-green"
        onClick={() => {
          handleClick(Detections.Body);
        }}
      >
        Детектор тела
      </button>
      <button
        className="btn-green"
        onClick={() => {
          handleClick(Detections.AgeEmoGen);
        }}
      >
        Детектор гендера, возраста и эмоций
      </button>
    </div>
  );
}
