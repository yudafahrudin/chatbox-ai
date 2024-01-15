import React, { useState } from "react";
import { useCompletion } from "ai/react";

interface Chat {
  message: string;
  date: string;
  from: string;
}

const HomePresentation: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    { date: "12.30", message: "Halo", from: "bot" },
    { date: "12.35", message: "Halo", from: "sender" },
    { date: "13.20", message: "Halo", from: "bot" },
    { date: "14.30", message: "Halo", from: "sender" },
    { date: "14.22", message: "Halo", from: "bot" },
    { date: "15.33", message: "Halo", from: "sender" },
  ]);
  const { completion, input, handleInputChange, handleSubmit, error } =
    useCompletion();

  return (
    <div className="h-screen">
      {/* <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        <h4 className="text-xl font-bold text-gray-900 md:text-xl pb-4">
          useCompletion Example
        </h4>
        {error && (
          <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
            {error.message}
          </div>
        )}
        {completion}
        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div> */}

      <div className="navbar bg-base-100 shadow-md px-5">
        <div className="flex-1">
          <div className="avatar mx-3 mr-5">
            <div className="w-8 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div>Putri</div>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="container mx-auto chat-area p-5">
        <div className="my-5 w-full text-center">
          <div className="badge badge-ghost px-5 py-3">today</div>
        </div>
        {chats.map((chat) => {
          if (chat.from === "bot")
            return (
              <>
                <div className="chat chat-start mb-3 flex">
                  <input type="checkbox" className="checkbox mt-auto mb-2" />

                  <div className="chat-image avatar">
                    <div className="w-8 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                  <div className="chat-bubble p-3">
                    <div className="mb-2">
                      {chat.message}{" "}
                      <time className="text-xs opacity-50">{chat.date}</time>
                    </div>
                    <div className="flex flex-row-reverse gap-4 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            );
          return (
            <div className="chat chat-end">
              <div className="chat-bubble bg-base-300 text-inherit	">
                {chat.message}{" "}
                <time className="text-xs opacity-50">{chat.date}</time>
              </div>
              <input type="checkbox" className="checkbox mt-auto mb-2" />
            </div>
          );
        })}
      </div>

      <div className="container flex mx-auto absolute inset-x-0 bottom-5 h-16 px-5">
        <input
          type="text"
          placeholder="Send Message..."
          className="input input-bordered w-full"
        />

        <button className="btn btn-ghost btn-active btn-link no-animation">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12l-4-4-4 4M12 16V9" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomePresentation;
