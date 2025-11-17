import { Mail, PhoneCall } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router";
import PersonCardSkeleton from "~/components/app-components/person-card-skeleton";
import { getAllLeadership } from "~/redux/features/leadershipSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { motion } from "motion/react";

const Team = () => {
  const dispatch = useAppDispatch();
  const { loading, data, refresh } = useAppSelector((state) => state.leader);
  const token = "d";

  useEffect(() => {
    dispatch(getAllLeadership({ token }));
  }, []);
  return (
    <div className="px-20 py-24 sm:py-32">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-wide">Meet Our Team</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {loading || !data?.result ? (
          <PersonCardSkeleton />
        ) : (
          data?.result?.map((person) => (
            <div
              key={person.id}
              className="flex flex-col items-start gap-5 max-sm:mb-5"
            >
              <div className="w-full relative overflow-hidden rounded-xl border">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  alt="image"
                  src={person?.imageUrl ?? "image-place.avif"}
                  className="w-[30rem] h-[16rem] object-fill rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                  {person?.name ?? "Name"}
                </h1>
                <p className="text-sm/6 font-semibold text-gray-500">
                  {person?.designation ?? "Designation"}
                </p>
                <div className="flex gap-5 mt-4">
                  <Link
                    to={`/contact-us`}
                    className="hover:scale-110  hover:text-green-400 transition-all"
                  >
                    <PhoneCall className="size-5 " />
                  </Link>
                  <Link
                    to={`mailto:${person?.email}`}
                    className="hover:scale-110  hover:text-red-500 transition-all"
                  >
                    <Mail className="size-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Team;
