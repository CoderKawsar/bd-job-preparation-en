import BookDetails from "@/components/pages/AllBooks/BookDetails";

export const metadata = {
  title: "Book Details",
};

const BookDetailsPage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <BookDetails id={id} />
    </div>
  );
};

export default BookDetailsPage;
