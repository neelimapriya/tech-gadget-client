import { HashLoader } from "react-spinners";
import Cards from "../Cards/Cards";
import useAllProduct from "../../Hooks/useAllProduct";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./product.css";
import PopularProduct from "../PopularProducts/PopularProduct";

const Products = () => {
  const [search, setSearch] = useState("");
  const [productPerPAge, setproductPerPAge] = useState(search? 4 : 20);
  const [currentPage, setCurrentPage] = useState(0);
  const [
    products,
    loading,
    refetch,
    setNewSearch,
    setPerPage,
    setCurrentPageValue,
  ] = useAllProduct(search, productPerPAge, currentPage);

  console.log(products);
  const { number } = useLoaderData({});
  console.log(number);
  const cardPerPage = 20;
  const numberOfPage = Math.ceil(number / cardPerPage);

  const pages = [...Array(numberOfPage).keys()];
  // console.log(pages)

  // search
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.search.value;

    setSearch(searchText);
    setNewSearch(search);
    // refetch()
    // form.reset()
  };
  // pagination
  const handleproductPerPAge = (e) => {
    console.log(e.target.value);
    const val = parseInt(e.target.value);

    setproductPerPAge(val);
    setPerPage(productPerPAge);

    setCurrentPage(0);
    setCurrentPageValue(currentPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  console.log(productPerPAge);
  console.log(currentPage);

  return (
    <div>
      <div className="bg-black text-white h-56 ">
        <h2 className="pt-32 flex justify-center items-center text-2xl md:text-4xl font-serif font-semibold text-red-700">
          Here is all products of Tech Gadget!
        </h2>
        <p className="flex justify-center items-center mb-8 text-[9px] md:text-xl ">
          The place to launch and discover new tech products.{" "}
          <span className="text-yellow-600 pl-2"> Take a tour.</span>
        </p>
      </div>
      <div>
        <PopularProduct></PopularProduct>
      </div>

      <form
        onSubmit={handleSearch}
        className=" flex justify-center items-center"
      >
        <input
          className="text-black  outline py-2 rounded"
          type="text"
          name="search"
        />
        <input
          className="font-semibold bg-gradient-to-r from-pink-800 to-pink-950 text-white hover:from-green-700 hover:to-yellow-500 p-2 rounded-lg btn"
          type="submit"
          value="search tags"
        />
      </form>
      {loading ? (
        <div className="flex justify-center items-center my-20">
          {" "}
          <HashLoader className="justify-center items-center"></HashLoader>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4  justify-center gap-4">
          {products?.map((product) => (
            <Cards key={product._id} item={product} refetch={refetch}></Cards>
          ))}
        </div>
      )}
      {/* pagination */}
      <div className="flex text-center justify-center mt-10 mb-10 pagination ">
        <button
          className="mx-3 bg-black text-white px-2 rounded-lg"
          onClick={handlePrevPage}
        >
          ← Prev
        </button>
        {pages.map((page) => (
          <button
            className={currentPage === page ? "selected" : undefined}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}

        <button
          className="mx-3 bg-black text-white px-2 rounded-lg"
          onClick={handleNextPage}
        >
          Next→
        </button>
        <select
          className="mx-3 bg-black text-white px-2 rounded-lg"
          value={productPerPAge}
          onChange={handleproductPerPAge}
          name=""
          id=""
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  );
};

export default Products;
