import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";

interface Book {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface BookRecommendationsProps {
  books: Book[];
}

export function BookRecommendations({ books }: BookRecommendationsProps) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#2D3E50]">Books for You</h2>
        <Button variant="ghost" size="icon" aria-label="Calendar">
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {books.map((book) => (
          <Link key={book.id} to={`/books/${book.id}`} className="group block">
            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2">
              <img
                src={book.image}
                alt={book.title}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xs font-medium text-foreground text-center leading-snug">
              {book.title}
            </h3>
            <p className="text-base font-bold text-[#49BBBD] text-center mt-0.5">
              ${book.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
