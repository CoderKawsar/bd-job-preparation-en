import { useGetSingleBookQuery } from "@/redux/api/booksApi";


const OrdersBooksData = ({bookId,quantity, price}) => {
   
    const {data} = useGetSingleBookQuery(bookId)
   
   
    return (
     
            <tr className="hover">
        <th>{data?.title} </th>
        <td>৳  {" "}{price}</td>
        <td>{quantity}টি</td>
       
      </tr>
        
    );
};

export default OrdersBooksData;