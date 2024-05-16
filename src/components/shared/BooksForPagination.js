import BookSectionCard from "../ui/Home/course/BookSectionCard";

function BooksForPagination({ books }) {
  return (
    <div className="mx-16 flex justify-center">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books?.map((book) => (
            <BookSectionCard key={book?._id} item={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BooksForPagination;
