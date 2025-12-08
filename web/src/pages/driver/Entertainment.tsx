import { Link } from "react-router-dom";
import book1Img from "../../assets/books/book1.png";
import book2Img from "../../assets/books/book2.png";
import book3Img from "../../assets/books/book3.png";
import book4Img from "../../assets/books/book4.png";

const books = [
  {
    id: 1,
    title: "Your Basic Guide To electric vehicle. Technology and Trends",
    image: book1Img,
    url: "https://autocrypt.io/wp-content/uploads/2021/08/electric-vehicle-ebook.pdf",
  },
  {
    id: 2,
    title: "ELECTRIC AND HYBRID VEHICLES",
    image: book2Img,
    url: "https://www.etf.ues.rs.ba/~slubura/Mehatronicki%20sistemi%20kod%20motora%20i%20vozila/Literatura/[Amir_Khajepour,_M._Saber_Fallah,_Avesta_Goodarzi](b-ok.org).pdf",
  },
  {
    id: 3,
    title: "ELECTRIC AND HYBRID VEHICLE TECHNOLOGY",
    image: book3Img,
    url: "https://arauniversity.org/wp-content/uploads/2021/03/Electric-Vehicle-Training-Final.pdf",
  },

  {
    id: 4,
    title: "ELECTRIC VEHICLE CHARGING INFRASTRUCTURE IMPLEMENTATION",
    image: book4Img,
    url: "https://www.niti.gov.in/sites/default/files/2023-02/EV_Handbook_Final_14Oct.pdf",
  },
];

const BookCard = ({
  book,
}: {
  book: { id: number; title: string; image: string; url: string };
}) => {
  return (
    <Link
      to={book.url}
      className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
      target="_blank"
    >
      <div>
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-[400px] object-cover rounded-md"
        />
      </div>
      <h3 className="text-lg font-semibold mt-2 line-clamp-2">{book.title}</h3>
    </Link>
  );
};

const Entertainment = () => {
  return (
    <div className="w-full h-full p-8 overflow-y-auto">
      {/* heading */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Entertainment</h1>
        <p className="text-base text-[#6B7280]">
          Read books about cars and EVs to spent your time while charging
        </p>
      </div>

      <div className="my-8 grid grid-cols-3 gap-6">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Entertainment;
