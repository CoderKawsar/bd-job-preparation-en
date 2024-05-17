const EmptyContent = (props) => {
  const { content = "Data" } = props;
  return (
    <div className="">
      <div className="flex justify-center items-center font-bold bg-green-400  text-white py-3 rounded text-lg mb-6">
        <h5>There is No {content}</h5>
      </div>
    </div> 
  );
};

export default EmptyContent;
