import React from "react";
import FollowersDispatch, { SocialBreakdownItem } from "./followers-dispatch";

// ...existing code...

export default function ProfileOverview({
  name = "Glovo Maroc",
  subtitle = "Your Local Delivery Partner for Everything",
  description = `Glovo Maroc is a delivery service that connects customers with local businesses, offering a wide range of products from food to groceries. Their social media presence emphasizes partnerships with local merchants, showcasing success stories and community engagement. Content themes include Ramadan promotions, customer support, and highlighting the convenience of their service.`,
  avatarUrl = null,
  followers = 111100,
  platform = "instagram" as "instagram" | "twitter" | "facebook",
  ringPercent = 75,
  socialBreakdown = [
    {
      name: "Instagram",
      percent: 40,
      followersCount: 4300.32,
      color: "#E1306C",
      gradient:
        "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #FD1D1D 100%)",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/2/21/Instagram_Glyph_Gradient_RGB_logo.svg",
    },
    {
      name: "TikTok",
      percent: 20,
      followersCount: 2100,
      color: "#010101",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/Tiktok_icon.svg",
    },
    {
      name: "YouTube",
      percent: 15,
      followersCount: 1380,
      color: "#FF0000",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    },
    {
      name: "X",
      percent: 10,
      followersCount: 890.33,
      color: "#000000",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg",
    },
    {
      name: "LinkedIn",
      percent: 5,
      followersCount: 500,
      color: "#0077B5",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
      coloredLogo:
        "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
    },
  ],
}: {
  name?: string;
  subtitle?: string;
  description?: string;
  avatarUrl?: string | null;
  followers?: number;
  platform?: "instagram" | "twitter" | "facebook";
  ringPercent?: number;
  socialBreakdown?: SocialBreakdownItem[];
}) {
  // ...existing code...

  return (
    <div className="w-full px-6 lg:px-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-6 items-start">
        {/* Left: avatar + text */}
  <div className="flex-1 min-w-0 flex flex-col gap-6 lg:flex-[0.6]">
          <div className="flex gap-6 items-center">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-white">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>G</span>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 text-2xl font-semibold leading-tight">
                {name}
              </h3>
              <p className="text-[13px] text-gray-600 mt-1">{subtitle}</p>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="text-gray-900 text-lg font-medium">
              Profile Overview
            </h4>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>

        {/* Right: chart + insights */}
        <div className="w-full lg:flex-[0.4] min-w-0">
          <FollowersDispatch socialBreakdown={socialBreakdown} />
        </div>
      </div>
    </div>
  );
}
