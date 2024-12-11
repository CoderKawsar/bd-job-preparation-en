import AllOrderBookDetails from "../admin/AllOrderBookDetails";
import BookSingleOrders from "./BookSingleOrders";
import UserOrderStatus from "./UserOrderStatus";

const SingleOrderDetails = ({ item }) => {
  const dateObject = new Date(item?.createdAt);
  const humanReadableFormatLocal = dateObject.toLocaleDateString();

  // (item)

  return (
    <tr className="hover border">
      <th>
        <BookSingleOrders key={item?.id} bookOrder={item} />{" "}
      </th>
      <td>$ {item?.total_price}</td>
      <td>{humanReadableFormatLocal}</td>
      <td>{item?.trx_id}</td>
      <td>
        <UserOrderStatus orderDetailsId={item?.id} />
      </td>
      <td>paid</td>
    </tr>
  );
};

export default SingleOrderDetails;
