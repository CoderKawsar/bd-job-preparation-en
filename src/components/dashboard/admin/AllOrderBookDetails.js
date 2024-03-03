import AllOrdersSingleBookData from "./AllOrdersSingleBookData";

const AllOrderBookDetails = ({ bookOrder }) => {
  const allOrders = JSON.parse(bookOrder?.orders);
  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>বইয়ের নাম </th>
          <th>প্রতিটি বইয়ের মূল্য</th>
          <th>পরিমান</th>
        </tr>
      </thead>
      <tbody>
        {allOrders &&
          allOrders?.map((order) => (
            <AllOrdersSingleBookData
              key={order?.id}
              bookId={order?.book_id}
              price={order?.unit_price}
              quantity={order?.book_quantity}
            />
          ))}
      </tbody>
    </table>
  );
};

export default AllOrderBookDetails;
