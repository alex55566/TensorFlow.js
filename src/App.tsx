import ErrorModal from "@/components/errorModal/ErrorModal";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { routes } from "@/routes";
import { mainStore } from "@/stores/MainStore";
import { observer } from "mobx-react-lite";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

const App = observer(() => {
  return (
    <>
      <RouterProvider router={router} />
      {mainStore.isLoading && <LoadingSpinner />}
      {mainStore.isError && <ErrorModal />}
    </>
  );
});

export default App;
