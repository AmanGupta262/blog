import React from 'react'

const Loading = () => {
    return (
      <>
        <div className="w-full flex flex-col justify-center items-center h-full bg-gray-500 opacity-40 fixed top-0 left-0 text-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-10 w-10 text-white mb-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#FFF"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="#ffff"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <small className="text-white text-xl font-bold">Loading...</small>
        </div>
      </>
    );
}

export default Loading
