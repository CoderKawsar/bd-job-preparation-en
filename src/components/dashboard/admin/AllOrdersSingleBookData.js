'use client'
import { useGetSingleBookQuery } from '@/redux/api/booksApi';


const AllOrdersSingleBookData = ({bookId,quantity, price}) => {
    const {data} = useGetSingleBookQuery(bookId)
    return (
        
            
            <tr className="hover">
        <th>{data?.title ? data?.title :"বইটি নাই"} </th>
        <td>৳  {" "}{price}</td>
        <td>{quantity}টি</td>
       
      </tr>
       
    );
};

export default AllOrdersSingleBookData;