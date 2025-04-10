import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  artist: string;
  image: string;
  price: number;
};

type SearchResultsProps = {
  results: Product[];
  isVisible: boolean;
  onClose: () => void;
};

export default function SearchResults({ results, isVisible, onClose }: SearchResultsProps) {
  if (!isVisible || results.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 bg-white border z-50 shadow-md max-h-[60vh] overflow-y-auto"
    >
      <div className="p-2">
        <ul>
          {results.map((product) => (
            <li key={product.id} className="border-b last:border-b-0">
              <Link
                href={`/product/${product.id}`}
                className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                onClick={onClose}
                prefetch={true}
              >
                <div className="relative w-12 h-12 mr-3 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-gray-500 truncate">{product.artist}</p>
                </div>
                <p className="font-medium whitespace-nowrap pl-2">{product.price} kr</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
} 