import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import Loading from "./Loading";
import Toast from "./Toast";

export const Alert = () => {
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

export const showErrMsg = (msg: string) => {
  return (
    <div
      className="bg-red-100 border my-2 border-red-400 text-center text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      {msg}
    </div>
  );
};
export const showSuccessMsg = (msg: string) => {
  return (
    <div
      className="bg-green-100 border my-2 border-green-400 text-center text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      {msg}
    </div>
  );
};
