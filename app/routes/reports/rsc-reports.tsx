import React, { useEffect } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
// import { BsFire, BsBuildingsFill } from "react-icons/bs";
import * as BsIcons from "react-icons/bs";
// import { MdElectricalServices } from "react-icons/md";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as GiIcons from "react-icons/gi";
import * as VscIcons from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { getAllReport } from "~/redux/features/reportSlice";

const RSCReports = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.report);

  useEffect(() => {
    dispatch(getAllReport({ token: "" }));
  }, []);

  const getBsIcon = (name: string): React.ElementType => {
    return (
      (BsIcons as Record<string, React.ElementType>)[name] || BsIcons.BsQuestion
    );
  };
  const getMdIcon = (name: string): React.ElementType => {
    return (
      (MdIcons as Record<string, React.ElementType>)[name] ||
      MdIcons.MdQuestionMark
    );
  };
  const getGrIcon = (name: string): React.ElementType => {
    return (
      (GrIcons as Record<string, React.ElementType>)[name] ||
      GrIcons.GrCircleQuestion
    );
  };
  const getGiIcon = (name: string): React.ElementType => {
    return (
      (GiIcons as Record<string, React.ElementType>)[name] ||
      GrIcons.GrCircleQuestion
    );
  };
  const getVscIcon = (name: string): React.ElementType => {
    return (
      (VscIcons as Record<string, React.ElementType>)[name] ||
      VscIcons.VscQuestion
    );
  };
  const getIcon = (icon: string) => {
    switch (icon) {
      case "BsFire":
        return { Icon: getBsIcon(icon), color: "text-red-500" };
      case "BsBuildingsFill":
        return { Icon: getBsIcon(icon), color: "text-blue-500" };
      case "MdElectricalServices":
        return { Icon: getMdIcon(icon), color: "text-yellow-500" };
      case "GrUserWorker":
        return { Icon: getGrIcon(icon), color: "text-green-500" };
      case "GiProgression":
        return { Icon: getGiIcon(icon), color: "text-orange-500" };
      default:
        return { Icon: getVscIcon("VscSearchStop"), color: "text-gray-500" };
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 sm:py-16">
      {/* title */}
      <div className="text-center text-2xl sm:text-3xl font-bold mb-10 sm:mb-16">
        <h1>RMG Sustainability Council (RSC) Reports</h1>
      </div>

      {/* content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 place-items-center">
        {data?.result?.map((item, i) => {
          const { Icon, color } = getIcon(item.icon);
          return (
            <Card
              key={i}
              className="w-full max-w-[18rem] text-center hover:scale-105 hover:shadow-2xl transition-all"
            >
              <Link to={item.pdfLink} target="_blank" className="h-full block">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center p-3">
                    <Icon className={`size-15 ${color}`} />
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RSCReports;
