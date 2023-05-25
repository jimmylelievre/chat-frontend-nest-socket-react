const Messages = ({ messages }: { messages: string[] }) => {
  return (
    <div className="p-5 border-2 rounded h-[700px] overflow-y-scroll whitespace-nowrap overscroll-none  ">
      {messages.map((message, index) => (
        <div className=" flex justify-end" key={index}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default Messages;
