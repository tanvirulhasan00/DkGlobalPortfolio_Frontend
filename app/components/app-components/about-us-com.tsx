// AboutUs.tsx - DK Global Fashion Wear Ltd.
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { getCompanyInfo } from "~/redux/features/companyInfoSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { Spinner } from "../ui/spinner";
import TeamSummary from "./TeamSummary";
import ClientSlider from "./ClientSlider";
import ImageGallery from "./image-gallery";
import ClientTestimonialSlider from "./client-testimonial";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface ProductCategory {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
}

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.companyInfo);

  const token = "";
  const id = 1;

  useEffect(() => {
    dispatch(getCompanyInfo({ token, id }));
  }, []);

  const formatNumber = (number: number | 0) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  // Company statistics
  const companyStats = [
    { number: "10+", label: "Years Experience", color: "text-pink-600" },
    { number: "10+", label: "Countries Served", color: "text-blue-600" },
    { number: "300K+", label: "Garments Monthly", color: "text-green-600" },
    { number: "98%", label: "Client Satisfaction", color: "text-purple-600" },
  ];
  const stats = [
    {
      id: 1,
      name: "Annual Turnover",
      value: `USD ${formatNumber(data?.result?.annualTurnover ?? 0)} Million`,
      color: "text-cyan-600",
    },
    {
      id: 2,
      name: "Production Capacity",
      value: `${formatNumber(data?.result?.productionCapacity ?? 0)} Pcs/Per Month`,
      color: "text-orange-600",
    },
    {
      id: 3,
      name: "Number Of Sewing Plants",
      value: `${data?.result?.numberOfSewingPlants}`,
      color: "text-green-600",
    },
    {
      id: 4,
      name: "Number Of Sewing Lines",
      value: `${data?.result?.numberOfSewingLines}`,
      color: "text-purple-600",
    },
    {
      id: 5,
      name: "Number of Employees",
      value: `${formatNumber(data?.result?.numberOfEmployees ?? 0)} (Current)`,
      color: "text-black",
    },

    {
      id: 6,
      name: "Primary Markets",
      value: `${data?.result?.primaryMarkets}`,
      color: "text-pink-600",
    },
  ];

  // Product categories
  const productCategories: ProductCategory[] = [
    {
      id: 1,
      name: "Outer Wear",
      description: "Everyday comfortable fashion",
      link: "/outerwears",
      image: "images/image2.png",
    },
    {
      id: 2,
      name: "Work Wear",
      description: "Premium business and formal wear",
      link: "/workwears",
      image: "images/image1.png",
    },
    {
      id: 3,
      name: "Fashion Wear",
      description: "Performance and athletic clothing",
      link: "/fashionwears",
      image: "images/denim.jpg",
    },
  ];

  // Manufacturing process steps
  const manufacturingSteps = [
    {
      step: "01",
      title: "Design & Concept",
      description: "Creative design development and trend analysis",
    },
    {
      step: "02",
      title: "Fabric Sourcing",
      description: "Global sourcing of premium quality materials",
    },
    {
      step: "03",
      title: "Pattern Making",
      description: "Precision pattern development and sampling",
    },
    {
      step: "04",
      title: "Production",
      description: "State-of-the-art manufacturing facilities",
    },
    {
      step: "05",
      title: "Quality Control",
      description: "Rigorous quality checks at every stage",
    },
    {
      step: "06",
      title: "Global Delivery",
      description: "Efficient logistics and worldwide shipping",
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50">
      {/* Hero Section */}
      <section
        className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-10000 hover:scale-100"
          style={{
            backgroundImage: 'url("images/profile.jpg")',
          }}
        ></div>

        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-pink-400">DK Global</span> Fashion Wear
            </h1>
            <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          </div>

          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-500">
            Leading garment manufacturer delivering quality fashion worldwide
            with sustainable practices and innovative designs
          </p>
          <div className="animate-fade-in-up animation-delay-700">
            <Link
              to="/contact-us"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-0 sm:mr-4"
            >
              Request Catalog
            </Link>
            <div className="inline-flex items-center justify-center max-sm:mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="text-black font-semibold px-8 py-7 rounded-full hover:bg-white/80"
                  >
                    View Collections
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <Link to={"/upper-outwears"}>
                      <DropdownMenuItem>Upper Wear</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link to={"/lower-outwears"}>
                      <DropdownMenuItem>Lower Wear</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-green-400 rounded-full animate-ping"></div>
      </section>

      {/* Company Story Section */}
      <section ref={addToRefs} className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Fashion <span className="text-indigo-600">Journey</span>
              </h2>
              <div className="mt-5">
                {loading ? (
                  <Spinner />
                ) : (
                  <p
                    className="text-gray-700 leading-relaxed text-justify whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.result?.description
                          ?.replaceAll(". ", ".<br>")
                          ?.replaceAll(
                            "DK GLOBAL FASHION WEAR",
                            "<span class='font-semibold text-pink-600'>DK GLOBAL FASHION WEAR</span>"
                          ) ??
                        "<span class='font-semibold text-indigo-600'>Data Not Found</span>",
                    }}
                  ></p>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We specialize in creating premium apparel across all categories,
                always staying ahead of fashion trends while maintaining the
                highest quality standards.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {companyStats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gray-50 rounded-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid gap-4">
                <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <img
                    src="images/tracking-pant.jpg"
                    alt="Manufacturing Facility"
                    className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                  <img
                    src="images/tracking-jacket.jpg"
                    alt="Quality Control"
                    className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gray-50 rounded-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <div
                      className={`text-lg ${stat.color} font-bold mb-2 break-words whitespace-pre-wrap leading-snug sm:text-2xl`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* image gallary */}
      <section ref={addToRefs}>
        <ImageGallery />
      </section>

      {/* Manufacturing Process Section */}
      <section
        ref={addToRefs}
        className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Our <span className="text-pink-600">Manufacturing</span> Process
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From concept to delivery, we maintain excellence at every step
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manufacturingSteps.map((step, index) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-500 group"
              >
                <div className="text-4xl font-bold text-pink-600 mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="w-12 h-1 bg-pink-600 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section ref={addToRefs} className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Our <span className="text-pink-600">Product</span> Range
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Diverse collections catering to all fashion needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category) => (
              <Link to={category.link} key={category.id}>
                <div
                  key={category.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-500 cursor-pointer"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-start p-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-bold mb-2 ">
                        {category.name}
                      </h3>
                      <p className="text-gray-200">{category.description}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white ">
                    <h3 className="text-2xl font-bold group-hover:hidden">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={addToRefs} className="">
        <TeamSummary />
      </section>

      {/* Sustainability Section */}
      <section ref={addToRefs} className="py-20 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our <span className="text-green-600">Sustainable</span>{" "}
                Commitment
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At DK Global Fashion Wear, we believe in fashion that cares for
                our planet. Our sustainable practices include:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3 mt-1">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Eco-friendly fabrics and materials
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3 mt-1">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Water conservation in production
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3 mt-1">
                    ✓
                  </span>
                  <span className="text-gray-700">Ethical labor practices</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3 mt-1">
                    ✓
                  </span>
                  <span className="text-gray-700">
                    Waste reduction initiatives
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="images/complience.png"
                alt="Sustainable Manufacturing"
                className="rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-600">Ethical Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={addToRefs}>
        <ClientSlider />
      </section>
      <section ref={addToRefs}>
        <ClientTestimonialSlider />
      </section>

      {/* CTA Section */}
      <section ref={addToRefs} className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Your{" "}
            <span className="text-pink-400">Fashion Line</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Partner with DK Global Fashion Wear Ltd. and let's bring your
            fashion vision to life with quality, style, and reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact-us"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
