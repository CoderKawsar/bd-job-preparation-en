import BookDetails from "@/components/pages/AllBooks/BookDetails";

export const metadata = {
  title: "বই ডেটেইলস",
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
