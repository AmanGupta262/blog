import { useDispatch } from "react-redux";
import { ALERT, IAlertType } from "../../redux/types/alertTypes";

interface IToast {
  title: string;
  body: string | string[];
  bgcolor: string;
  svg: number;
}

const svgs = [
  //success
  "M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z",
  //info
  "M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z",
  //warning
  "M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z",
  //error
  "M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z",
];
const Toast = ({ title, body, bgcolor, svg }: IToast) => {
  const dispacth = useDispatch();
  const handleClose = () => {
      dispacth({type: ALERT, payload: {}})
  };
  return (
    <>
      <div className="fixed top-5 right-5 z-40 flex w-full max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <div
          className={`flex items-center justify-center w-12 bg-${bgcolor}-500`}
        >
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={`${svgs[svg]}`} />
          </svg>
        </div>

        <div className="px-4 py-2 -mx-3">
          <div className="mx-3">
            <div
              className="w-4 absolute top-2 right-2 cursor-pointer"
              onClick={handleClose}
            >
              <svg viewBox="0 0 40 40">
                <path
                  className="close-x"
                  stroke="black"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M 10,10 L 30,30 M 30,10 L 10,30"
                />
              </svg>
            </div>

            <span
              className={`font-semibold text-${bgcolor}-500 dark:text-${bgcolor}-400`}
            >
              {title}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-200">
              {typeof body === "string" ? (
                body
              ) : (
                <ul>
                  {body.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
