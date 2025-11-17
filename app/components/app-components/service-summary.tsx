import { useEffect } from "react";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GiBoxCutter, GiClothes, GiSewingNeedle } from "react-icons/gi";
import { FcCustomerSupport } from "react-icons/fc";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { getProfileImages } from "~/redux/features/ProfileImageSlice";
import { Leaf } from "lucide-react";
import { FaTruckPlane } from "react-icons/fa6";

const ServiceSummary = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.profile_images);

  useEffect(() => {
    dispatch(getProfileImages({ token: "", id: 1 }));
  }, []);

  const about = [
    {
      id: 1,
      title: "Garment Manufacturing",
      description:
        "Full-scale production of knit, woven, and denim apparel for men, women, and children.",
      icon: GiClothes,
    },
    {
      id: 2,
      title: "Product Development & Sampling",
      description:
        "Bringing creative ideas to life through pattern making, sampling, and prototyping.",
      icon: GiBoxCutter,
    },
    {
      id: 3,
      title: "Sustainable Production",
      description:
        "Environmentally responsible practices including eco-friendly fabrics, water-efficient dyeing, and waste reduction.",
      icon: Leaf,
    },
    {
      id: 4,
      title: "Fabric Sourcing & Quality Control",
      description:
        "Partnering with trusted suppliers to ensure consistent quality and compliance.",
      icon: GiSewingNeedle,
    },
    {
      id: 5,
      title: "Logistics & On-Time Delivery",
      description:
        "Seamless global shipping with strict adherence to timelines.",
      icon: FaTruckPlane,
    },
    {
      id: 6,
      title: "Private Label & OEM Services",
      description:
        "Supporting international brands with white-label and custom-manufactured products.",
      icon: FcCustomerSupport,
    },
  ];

  return (
    <div className="px-10 py-10">
      <div className="py-10 md:mb-20 bg-gradient-to-t from-white to-indigo-50 rounded-t-2xl rounded-b-full">
        <span className="text-center text-base/7 font-semibold text-indigo-600 flex items-center justify-center">
          Faster Services
        </span>
        <h1 className="mx-auto mt-2 max-w-xl text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          Everything you need to know about{" "}
          <span className="text-indigo-600">What We Do</span>
        </h1>
        <div className="w-full flex justify-center mt-3 sm:hidden">
          <div className="w-[8rem]">
            <Separator className="bg-indigo-600" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
        <div className="grid gap-y-5 sm:gap-y-10">
          <h1 className="md:text-2xl lg:text-4xl text-xl font-bold">
            At DK Global Fashion Wear Ltd.
          </h1>
          <p className="tracking-wide sm:leading-8 text-justify text-gray-700">
            We design, develop, and manufacture premium-quality garments for
            global fashion brands. From fabric sourcing and sampling to bulk
            production and timely delivery, DK Global Fashion Wear Ltd. provides
            complete apparel manufacturing solutions with a commitment to
            quality, ethics, and sustainability.
          </p>
          <div className="flex gap-5 items-center group">
            <Link
              to="/about-us"
              className="text-sm/6 font-semibold text-red-600 transition-all inline-flex gap-1 duration-300 group-hover:gap-1"
            >
              Learn more
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
        {/* image */}
        <div>
          <img
            src={data?.result?.imageUrl}
            alt={data?.result?.title}
            className="w-full"
          />
        </div>
      </div>
      {/* content */}
      <div className="grid grid-cols-1 sm:grid-cols-4 py-6 gap-5">
        {about.map((item) => (
          <Card
            key={item.id}
            className="hover:border-emerald-600 transition-all"
          >
            <CardHeader>
              <item.icon className="size-10" />
            </CardHeader>
            <CardContent className="grid gap-y-4">
              <h1 className="font-bold">{item.title}</h1>
              <p className="text-sm text-gray-600">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceSummary;
