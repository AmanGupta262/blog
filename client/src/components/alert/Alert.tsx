import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import Loading from "./Loading";
import Toast from "./Toast";

const Alert = () => {
  const { alert } = useSelector((state: RootStore) => state);
  return (
    <>
      {alert.loading && <Loading />}
      {alert.errors && (
        <Toast title="Errors" body={alert.errors} bgcolor="red" svg={2} />
      )}
      {alert.success && (
        <Toast title="Success" body={alert.success} bgcolor="green" svg={0} />
      )}
    </>
  );
};

export default Alert;
