import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdOutlinePhoneIphone } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Spinner } from "~/components/ui/spinner";
import { getCompanyInfo } from "~/redux/features/companyInfoSlice";
import { createMessage } from "~/redux/features/messageSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

export default function Contact() {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.companyInfo);
  const { loading: mLoading, Data: message } = useAppSelector(
    (state) => state.message
  );
  const token = "";
  const id = 1;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phoneNumber: "",
    countryCode: "BD",
    content: "",
  });

  useEffect(() => {
    dispatch(getCompanyInfo({ token, id }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([k, v]) =>
      formPayload.append(k, String(v ?? ""))
    );

    dispatch(createMessage({ token, formPayload }));
  };

  console.log("form data", formData);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 p-10">
      {/* form */}
      <div className="isolate bg-white px-6 py-10 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ffff] to-[#ffff] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
          />
        </div>

        <div className="mb-3">
          {message?.success ? (
            <Alert className="text-green-500">
              <CheckCircle2Icon />
              <AlertTitle>{message?.statusCode}</AlertTitle>
              <AlertDescription>{message?.message}</AlertDescription>
            </Alert>
          ) : (
            ""
          )}
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Contact Us
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Company Name
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  onChange={handleChange}
                  autoComplete="organization"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2.5">
                <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                  <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                    <select
                      id="countryCode"
                      name="countryCode"
                      onChange={handleSelectChange}
                      autoComplete="countryCode"
                      aria-label="CountryCode"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>BD</option>
                      <option>US</option>
                      <option>UK</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    onChange={handleChange}
                    placeholder=""
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="content"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  onChange={handleTextAreaChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {mLoading ? (
                <Spinner className="flex items-center justify-center w-full" />
              ) : (
                "Let's talk"
              )}
            </button>
          </div>
        </form>
      </div>
      {/* location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="mt-10 border-none rounded-md bg-gray-100 p-8 flex flex-col gap-4 max-sm:col-span-2">
          <h1 className="text-xl font-bold">Contact</h1>
          <p className="text-indigo-600 flex gap-2 items-center">
            <MdEmail /> {data?.result?.email}
          </p>
          <p className="flex items-center gap-2">
            <MdOutlinePhoneIphone /> {data?.result?.phoneNumber}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="mt-10 border-none rounded-md bg-gray-100 p-8 flex flex-col gap-3">
            <h1 className="text-xl font-bold flex gap-5 items-center">
              <FaMapMarkerAlt /> Factory
            </h1>
            <p className="text-indigo-600 flex gap-2 items-center">
              {data?.result?.location}
            </p>
          </div>
          <div className="mt-10 border-none rounded-md bg-gray-100 p-8 flex flex-col gap-3">
            <h1 className="text-xl font-bold flex gap-5 items-center">
              <FaMapMarkerAlt /> Head Office
            </h1>
            <p className="text-indigo-600 flex gap-2 items-center">
              House 52, Road 01, Sector 3, Uttara, Dhaka 1230
            </p>
          </div>
        </div>
        {/* map */}
        <div className="mt-4 rounded-xl flex flex-col gap-4 col-span-2">
          <div>
            <h1 className="text-center">Factory</h1>
            <iframe
              className="mt-4 rounded-xl shadow-xl ring-1 ring-gray-400/10 "
              title="Google Map"
              src={data?.result?.mapLink}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div>
            <h1 className="text-center">Head Office</h1>
            <iframe
              className="mt-4 rounded-xl shadow-xl ring-1 ring-gray-400/10 "
              title="Google Map"
              src={data?.result?.secondMapLink}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
