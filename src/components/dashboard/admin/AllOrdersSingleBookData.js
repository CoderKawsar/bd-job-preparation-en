"use client";
import { useGetSingleBookQuery } from "@/redux/api/booksApi";

const AllOrdersSingleBookData = ({ bookId, quantity, price }) => {
  const { data } = useGetSingleBookQuery(bookId);
  return (
    <tr className="hover">
      <th>{data?.title ? data?.title : "No Book"} </th>
      <td>$ {price}</td>
      <td>{quantity}</td>
    </tr>
  );
};

export default AllOrdersSingleBookData;
