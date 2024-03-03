
const UserSeeBroadQuestion = ({ item, index, setIsModalOpen1 }) => {
    return (
        <div >
            <button
                onClick={() => {
                    setIsModalOpen1(false);
                }}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
                ✕
            </button>
            <h1 className="text-xl py-2">{index + 1}) {item?.question}{"      "} -----<span className="font-semibold"> mark: {item?.mark}</span></h1>
        </div>
    );
};

export default UserSeeBroadQuestion;