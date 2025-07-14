import { exerciseStore } from "@/stores/ExerciseStore";
import { observer } from "mobx-react-lite";
const QuantityCounter = observer(() => {
  return (
    <div>
      <div>Количество повторений {exerciseStore.handsUp}</div>
    </div>
  );
});

export default QuantityCounter;
