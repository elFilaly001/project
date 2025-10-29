"use client";

import React from "react";
import {
  FaChartBar,
  FaIndustry,
  FaEye,
  FaCommentDots,
  FaSmile,
  FaKey,
  FaBalanceScale,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

interface ReportsCardProps {
  image: string; // URL or path to the image
  titleIcon: string; // Icon type
  title: string; // Card title
  description: string; // Card description
  onCreateClick: () => void; // Callback for the "Create" button
}

const ReportsCard: React.FC<ReportsCardProps> = ({
  image,
  titleIcon,
  title,
  description,
  onCreateClick,
}) => {
  const t = useTranslations(); // Hook for translations

  const getTitleIcon = (iconType: string) => {
    switch (iconType) {
      case "benchmark":
        return <FaChartBar className="w-5 h-5 text-blue-500" />;
      case "market":
        return <FaIndustry className="w-5 h-5 text-green-500" />;
      case "overview":
        return <FaEye className="w-5 h-5 text-cyan-500" />;
      case "mentions":
        return <FaCommentDots className="w-5 h-5 text-cyan-500" />;
      case "sentiment":
        return <FaSmile className="w-5 h-5 text-cyan-500" />;
      case "keyword":
        return <FaKey className="w-5 h-5 text-cyan-500" />;
      case "competitive":
        return <FaBalanceScale className="w-5 h-5 text-cyan-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border p-4 flex flex-col items-center">
      {/* Image Section */}
      <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={image}
          alt="Report Preview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title Section */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          {getTitleIcon(titleIcon)}
          <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
        </div>
      </div>

      {/* Description Section */}
      <p className="text-gray-600 text-sm text-center mb-4">{description}</p>

      {/* Create Button */}
      <p
        onClick={onCreateClick}
        className="text-blue-500 text-sm font-bold cursor-pointer hover:underline"
      >
        {t("reports.createButton")}
      </p>
    </div>
  );
};

export default ReportsCard;