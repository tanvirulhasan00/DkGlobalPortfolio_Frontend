import React, { useEffect } from "react";
import PdfFlipBookClient from "~/components/app-components/pdf-client";
import { getAllProfileImages } from "~/redux/features/ProfileImageSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const Outerwear = () => {
  const dispatch = useAppDispatch();
  const { loading, dataList } = useAppSelector((state) => state.profile_images);
  useEffect(() => {
    dispatch(getAllProfileImages({ token: "" }));
  }, [dispatch]);
  const filterImages = dataList?.result?.find(
    (item) => item?.searchText?.toLowerCase() === "outerwear-pdf"
  )?.imageUrl;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <PdfFlipBookClient
        pdfUrl1={filterImages ?? ""}
        title="Outer Wear Profile"
      />
    </div>
  );
};

export default Outerwear;
