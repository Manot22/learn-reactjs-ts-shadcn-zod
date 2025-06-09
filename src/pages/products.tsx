import ProtectedRoute from "@/lib/ProtectedRoute";
import { useProducts } from "@/hooks/useProducts";
import Header from "@/components/Layouts/Header";
import CardProduct from "@/components/Fragments/CardProduct";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

const ProductsPage = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const category = [
    "all",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" ||
      product.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (cat: string) => {
    setSearchParams(cat === "all" ? {} : { category: cat.toLowerCase() });
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase());
    } else {
      setActiveCategory("all");
    }
  }, [searchParams]);

  return (
    <ProtectedRoute>
      <Header />

      <div className="m-4 flex justify-between items-center">
        <ul className="flex gap-4">
          {category.map((cat) => (
            <li
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`border px-4 rounded-md cursor-pointer capitalize ${
                activeCategory === cat
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-400 hover:text-white"
              }`}
            >
              {cat === "all" ? "Semua product" : cat}
            </li>
          ))}
        </ul>

        <Input
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm shadow border-2 "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-4">
        {filteredProducts.map((item) => (
          <CardProduct id={item.id} key={item.id}>
            <CardProduct.Header title={item.title} />
            <CardProduct.Body
              description={item.description}
              image={item.image}
              category={item.category}
              price={item.price}
            />
            <CardProduct.Footer />
          </CardProduct>
        ))}
      </div>
    </ProtectedRoute>
  );
};

export default ProductsPage;
