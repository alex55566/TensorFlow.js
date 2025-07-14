import { PartBody } from "@/enum/detections";
import { exerciseStore } from "@/stores/ExerciseStore";
import * as poseDetection from "@tensorflow-models/pose-detection";

let armsRaisedRef = false;

export const checkArmsPosition = (keypoints: poseDetection.Keypoint[], videoHeight: number) => {
  if (videoHeight === 0) {
    return;
  }
  const leftShoulder = keypoints.find((k) => k.name === PartBody.LeftShoulder);
  const rightShoulder = keypoints.find((k) => k.name === PartBody.RightShoulder);
  const leftElbow = keypoints.find((k) => k.name === PartBody.LeftElbow);
  const rightElbow = keypoints.find((k) => k.name === PartBody.RightElbow);

  if (
    leftShoulder &&
    leftElbow &&
    rightShoulder &&
    rightElbow &&
    leftShoulder.score! > 0.8 &&
    rightShoulder.score! > 0.8 &&
    leftElbow.score! > 0.8 &&
    rightElbow.score! > 0.8
  ) {
    const leftRaised = leftElbow.y < leftShoulder.y;
    const rightRaised = rightElbow.y < rightShoulder.y;
    const bothRaised = leftRaised && rightRaised;

    if (bothRaised && !armsRaisedRef) {
      exerciseStore.incrementHandsUp();
      armsRaisedRef = true;
    } else if (!bothRaised && armsRaisedRef) {
      armsRaisedRef = false;
    }
  }
};
