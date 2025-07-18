import { Detections } from "@/enum/detections";
import { ChooseDetection } from "@/modules/chooseDetection/ChooseDetection";
import { lazy, useState } from "react";
const DetectFaceMask = lazy(
  () => import("@/modules/detectFaceMask/DetectFaceMask")
);
const DetectBody = lazy(() => import("@/modules/detectBody/DetectBody"));
const DetectAgeEmoGen = lazy(
  () => import("@/modules/detectAgeEmoGen/DetectAgeEmoGen")
);

export default function MainDetection() {
  const [detection, setDetection] = useState("");

  const renderDetection = () => {
    switch (detection) {
      case Detections.FaceMask:
        return <DetectFaceMask key={Detections.FaceMask} />;
      case Detections.Body:
        return <DetectBody key={Detections.Body} />;
      case Detections.AgeEmoGen:
        return <DetectAgeEmoGen key={Detections.AgeEmoGen} />;
      default:
        return <ChooseDetection handleClick={onClick} />;
    }
  };

  function onClick(name: Detections) {
    setDetection(name);
  }
  return <div>{renderDetection()}</div>;
}
