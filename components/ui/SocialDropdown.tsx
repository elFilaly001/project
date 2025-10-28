import React from "react";

export type SocialPlatform = {
  name: string;
  count: number | null;
  logo: string;
  color: string;
  text: string;
};

export type SocialDropdownProps = {
  socialPlatforms: SocialPlatform[];
  allSocialOption: SocialPlatform;
  selectedSocial: string | null;
  setSelectedSocial: (name: string | null) => void;
  fullWidth?: boolean;
};

const SocialDropdown: React.FC<SocialDropdownProps> = ({
  socialPlatforms,
  allSocialOption,
  selectedSocial,
  setSelectedSocial,
  fullWidth = false,
}) => {
  const [showSocialDropdown, setShowSocialDropdown] = React.useState(false);

  return (
    <div className="relative">
      <button
        className={`h-10 border rounded-md px-2 text-sm bg-white flex items-center pr-8 relative ${fullWidth ? "w-full" : "min-w-[160px]"
          }`}
        style={{ minHeight: 40 }}
        onClick={() => setShowSocialDropdown((v) => !v)}
        type="button"
      >
        {selectedSocial ? (
          <>
            <img
              src={
                socialPlatforms.find((s) => s.name === selectedSocial)?.logo ||
                allSocialOption.logo
              }
              alt={selectedSocial}
              className="w-5 h-5 mr-1"
              style={{ display: "inline-block", verticalAlign: "middle" }}
            />
            <span>{selectedSocial}</span>
          </>
        ) : (
          <>
            <img
              src={allSocialOption.logo}
              alt="All Social Medias"
              className="w-5 h-5 mr-1"
              style={{ display: "inline-block", verticalAlign: "middle" }}
            />
            <span>All Social Medias</span>
          </>
        )}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
            <path
              d="M6 8l4 4 4-4"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {showSocialDropdown && (
        <div className="absolute left-0 mt-2 z-20 bg-white border rounded-md shadow-lg w-full min-w-[180px]">
          {socialPlatforms.map((platform) => {
            const isSelected = selectedSocial === platform.name;
            // Show white logo only when selected or hovered (black bg), otherwise grayscale (for TikTok/X)
            return (
              <button
                key={platform.name}
                className={`flex items-center gap-2 px-2 py-2 w-full rounded text-xs font-medium transition group`}
                style={
                  isSelected
                    ? {
                      background: platform.color,
                      color: platform.text,
                    }
                    : {}
                }
                onClick={() => {
                  setSelectedSocial(platform.name);
                  setShowSocialDropdown(false);
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = platform.color;
                    e.currentTarget.style.color = platform.text;
                    // For TikTok/X, force white logo on hover
                    const img = e.currentTarget.querySelector("img");
                    if (
                      img &&
                      (platform.name === "TikTok" || platform.name === "X")
                    ) {
                      img.style.filter = "brightness(0) invert(1)";
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "";
                    // For TikTok/X, revert logo on mouse leave
                    const img = e.currentTarget.querySelector("img");
                    if (
                      img &&
                      (platform.name === "TikTok" || platform.name === "X")
                    ) {
                      img.style.filter = "grayscale(1)";
                    }
                  }
                }}
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-5 h-5 mr-1"
                  style={{
                    filter:
                      platform.name === "TikTok" || platform.name === "X"
                        ? isSelected
                          ? "brightness(0) invert(1)"
                          : "grayscale(1)"
                        : isSelected
                          ? "none"
                          : "grayscale(1)",
                  }}
                />
                {platform.name}
                {platform.count !== null && (
                  <span className="ml-auto text-xs font-semibold opacity-80">
                    ({platform.count})
                  </span>
                )}
              </button>
            );
          })}
          {/* All Social Medias option at the end */}
          <button
            className={`flex items-center gap-2 px-2 py-2 w-full rounded text-xs font-medium transition ${!selectedSocial
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
              }`}
            style={
              !selectedSocial
                ? {
                  background: allSocialOption.color,
                  color: allSocialOption.text,
                }
                : {}
            }
            onClick={() => {
              setSelectedSocial(null);
              setShowSocialDropdown(false);
            }}
          >
            <img
              src={allSocialOption.logo}
              alt="All Social Medias"
              className="w-5 h-5 mr-1"
              style={{ filter: !selectedSocial ? "none" : "grayscale(1)" }}
            />
            All Social Medias
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialDropdown;
