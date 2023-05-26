const Messages = ({
  messages,
  color,
}: {
  messages: string[];
  color: string;
}) => {
  return (
    <div className="p-5 border-2 no-scrollbar rounded h-[700px] overflow-y-scroll whitespace-nowrap overscroll-none  ">
      {messages.map((message, index) => (
        <div
          className=" flex rounded p-3 mt-3 justify-end border-2"
          style={{ color: color }}
          key={index}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default Messages;
