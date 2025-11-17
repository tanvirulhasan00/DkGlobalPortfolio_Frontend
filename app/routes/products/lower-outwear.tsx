import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import {
  getAllProduct,
  getAllProductCategory,
} from "~/redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import QuickViewModal from "./QuickViewModal";

const LowerOutwear = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCat, setSelectedCat] = useState("all");
  const dispatch = useAppDispatch();
  const { loading, categoryData, productData } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAllProductCategory({ token: "" }));
    dispatch(getAllProduct({ token: "" }));
  }, []);

  const handleModalBtn = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };
  const lowerwear = productData?.result?.filter((f) =>
    f.name.includes("lower")
  );
  const filteredProducts =
    selectedCat === "all"
      ? lowerwear
      : lowerwear?.filter(
          (p) => p.category.toLowerCase() === selectedCat.toLowerCase()
        );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-3 border-b pb-3">
          {loading ? (
            <Spinner />
          ) : !categoryData?.result && !categoryData?.result ? (
            <h1 className="text-gray-500">No Category</h1>
          ) : (
            categoryData?.result?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.name)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all duration-200 ${
                  selectedCat === cat.name
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))
          )}
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
          Our Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts && filteredProducts?.length > 0 ? (
            filteredProducts?.map((product) => (
              <div key={product.id} className="group relative cursor-pointer">
                <div className="relative overflow-hidden rounded-lg border shadow-md h-[20rem]">
                  {/* Image: clickable on mobile, hover overlay on desktop */}
                  <img
                    alt={product.name}
                    src={product.imageUrl}
                    className="aspect-square w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onClick={() => handleModalBtn(product.id)} // make it clickable on all devices
                  />

                  {/* Overlay content (desktop only) */}
                  <div className="absolute inset-0 hidden sm:flex flex-col justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* <h3 className="text-lg font-semibold text-white mb-2">
                      {product.name}
                    </h3> */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModalBtn(product.id);
                      }}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No products found.
            </p>
          )}
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          pId={selectedId}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default LowerOutwear;
