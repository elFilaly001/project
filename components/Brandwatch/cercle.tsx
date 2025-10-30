"use client";
import React from "react";
import "./cercle.css";
import SearchBrand from "./SearchBrand";

// Local interface matching fields used in this component
interface Influencer {
    id: string;
    profilePic: string;
    name?: string;
    handle?: string;
    // optional categories/niche label used by ranking components
    categories?: { name: string }[];
}

interface Pagination {
    influencers: Influencer[];
}

// Static data using internet-hosted Moroccan company logos via Clearbit
export const staticInfluencers: Influencer[] = [
    { id: "1", profilePic: "https://dirigeants-entreprise.com/content/uploads/maroc-telecom.png", name: "Maroc Telecom", handle: "@maroctelecom", categories: [{ name: 'Telecom' }] },
    { id: "2", profilePic: "https://logo.clearbit.com/attijariwafabank.com", name: "Attijariwafa Bank", handle: "@attijariwafa", categories: [{ name: 'Banking' }] },
    { id: "3", profilePic: "https://yt3.googleusercontent.com/ytc/AIdro_lU2FGorBPAa2D5VFAqYLEHq51KyH-mt3jt4o6ArcUgxak=s160-c-k-c0x00ffffff-no-rj", name: "Banque Populaire", handle: "@banquepopulaire", categories: [{ name: 'Banking' }] },
    { id: "4", profilePic: "https://logo.clearbit.com/bmcebank.ma", name: "BMCE Bank", handle: "@bmce", categories: [{ name: 'Banking' }] },
    { id: "5", profilePic: "https://logo.clearbit.com/inwi.ma", name: "Inwi", handle: "@inwi", categories: [{ name: 'Telecom' }] },
    { id: "6", profilePic: "https://logo.clearbit.com/royalairmaroc.com", name: "Royal Air Maroc", handle: "@royalairmaroc", categories: [{ name: 'Aviation' }] },
    { id: "7", profilePic: "https://logo.clearbit.com/ocpgroup.ma", name: "OCP Group", handle: "@ocpgroup", categories: [{ name: 'Mining & Fertilizers' }] },
    { id: "8", profilePic: "https://logo.clearbit.com/oncf.ma", name: "ONCF", handle: "@oncf", categories: [{ name: 'Transport' }] },
    { id: "9", profilePic: "https://logo.clearbit.com/cosumar.ma", name: "Cosumar", handle: "@cosumar", categories: [{ name: 'Food & Agriculture' }] },
    { id: "10", profilePic: "https://logo.clearbit.com/cihbank.ma", name: "CIH Bank", handle: "@cihbank", categories: [{ name: 'Banking' }] },
    { id: "11", profilePic: "https://logo.clearbit.com/wafasalaf.com", name: "Wafasalaf", handle: "@wafasalaf", categories: [{ name: 'Consumer Finance' }] },
    { id: "12", profilePic: "https://logo.clearbit.com/labelvie.ma", name: "Label'Vie", handle: "@labelvie", categories: [{ name: 'Retail' }] },
    { id: "13", profilePic: "https://logo.clearbit.com/marjane.ma", name: "Marjane", handle: "@marjane", categories: [{ name: 'Retail' }] },
    { id: "14", profilePic: "https://logo.clearbit.com/afriquia.ma", name: "Afriquia", handle: "@afriquia", categories: [{ name: 'Energy' }] },
    { id: "15", profilePic: "https://logo.clearbit.com/bmci.ma", name: "BMCI", handle: "@bmci", categories: [{ name: 'Banking' }] },
    { id: "16", profilePic: "https://logo.clearbit.com/somaca.ma", name: "Somaca", handle: "@somaca", categories: [{ name: 'Automotive' }] },
    { id: "17", profilePic: "https://logo.clearbit.com/lydec.ma", name: "Lydec", handle: "@lydec", categories: [{ name: 'Utilities' }] },
    { id: "18", profilePic: "https://logo.clearbit.com/hps-worldwide.com", name: "HPS", handle: "@hps", categories: [{ name: 'Fintech' }] },
];

const Circle = () => {
    const data: Pagination = { influencers: staticInfluencers };

    return (
        <div>
            <div className="relative mt-[23%]">
                <>
                    <BoxCreators
                        className="transform rotate-[25deg]"
                        size={440}
                        duration={30}
                        data={data.influencers.slice(0, 6)}
                    />
                    <BoxCreators
                        className=""
                        size={560}
                        duration={30}
                        data={data.influencers.slice(5, 10)}
                    />
                    <BoxCreators
                        className="transform rotate-[75deg]"
                        size={660}
                        duration={30}
                        data={data.influencers.slice(12, 18)}
                    />
                </>
                <MiddleElement />
            </div>
        </div>
    );
};

const BoxCreators = ({
    size,
    duration,
    data,
    className,
}: {
    size: number;
    duration: number;
    data: Influencer[];
    className: string;
}) => {
    return (
        <div
            className={`box-network px-12 ${className}`}
            style={
                {
                    "--size": `${size}px`,
                    "--duration": `${duration}s`,
                    height: `${size}px`,
                    width: `${size}px`,
                    border: "0.3px solid #EFEFEF",
                } as React.CSSProperties
            }
        >
            {data.map((item, index) => (
                <div className={`group-icon `} key={index} style={{ zIndex: 99 }}>
                    <div className={`box-${index} children-container `}>
                        <img
                            src={item.profilePic}
                            width={74}
                            height={74}
                            className="rounded-full mx-auto w-[74px] h-[74px] bg-contain p-0.5"
                            alt={item.name ?? item.handle ?? "avatar"}
                        />

                        {/* 
            <img
              src={item.picture}
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
              }}
              alt=""
            /> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

const MiddleElement = () => {
    return (
        <div className="inset-1/2 z-50 -translate-x-1/2 -top-[40px] -translate-y-1/2 absolute w-[340px] text-center flex flex-col gap-2">
            <h2 className=" text-xl font-semibold">Network Watch</h2>
            <p className="text-whiteColor">Explore Creator Partnerships & Networks</p>

            <SearchBrand />
            {/* <AutoCompleteFilter
        type="Brand"
        onValueChange={(account) => {
          router.push(`/social-listening/${account.id}`);
        }}
      /> */}
        </div>
    );
};

export default Circle;
