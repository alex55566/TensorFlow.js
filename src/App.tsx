import ErrorModal from "@/components/errorModal/ErrorModal";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { ChooseDetection } from "@/modules/chooseDetection/ChooseDetection";
import { mainStore } from "@/stores/MainStore";
import { observer } from "mobx-react-lite";
import { lazy, useState } from "react";
import { Detections } from "./enum/detections";

const DetectFaceMask = lazy(
  () => import("@/modules/detectFaceMask/DetectFaceMask")
);
const DetectBody = lazy(() => import("@/modules/detectBody/DetectBody"));
const DetectAgeEmoGen = lazy(
  () => import("@/modules/detectAgeEmoGen/DetectAgeEmoGen")
);
const App = observer(() => {
  const [detection, setDetection] = useState("");

  function onClick(name: Detections) {
    setDetection(name);
  }

  const renderDetection = () => {
    if (mainStore.isError) {
      return <ErrorModal />;
    }
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

  return (
    <div className="App">
      {renderDetection()}
      {mainStore.isLoading && <LoadingSpinner />}
    </div>
  );
});

export default App;
