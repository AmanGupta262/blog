import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import Loading from "./Loading";
import Toast from "./Toast";

const Alert = () => {
  const { alert } = useSelector((state: RootStore) => state);
  return (
    <>
      {alert.loading && <Loading />}
      {/* {alert.errors && <Toast />} */}
    </>
  );
};

export default Alert;
