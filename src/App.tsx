import DetectAgeEmoGen from "@/modules/detectAgeEmoGen/DetectAgeEmoGen";
import DetectBody from "@/modules/detectBody/DetectBody";
import { useState } from "react";
import { Detections } from "./enum/detections";
import { ChooseDetection } from "./modules/chooseDetection/chooseDetection";
import DetectFaceMask from "./modules/detectFaceMask/DetectFaceMask";

function App() {
  const [detection, setDetection] = useState("");
  return (
    <div className="App">
      <ChooseDetection handleClick={setDetection} />
      {detection === Detections.FaceMask && <DetectFaceMask />}
      {detection === Detections.Body && <DetectBody />}
      {detection === Detections.AgeEmoGen && <DetectAgeEmoGen />}
    </div>
    // <DetectAgeEmoGen />
  );
}

export default App;
