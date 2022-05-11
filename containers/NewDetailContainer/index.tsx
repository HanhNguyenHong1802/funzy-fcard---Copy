import Banner from "@/components/Banner";
import NewItem from "@/components/New/NewItem";
import { timeDateFormat } from "@/utils/index";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FacebookShareButton } from "react-share";

type NewDetailContainerProps = {
  newDetail: any;
  listNew: Array<object>;
};

const NewDetailContainer = ({
  newDetail,
  listNew,
}: NewDetailContainerProps) => {
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (window) {
      setLink(window.origin + router.asPath);
    }
  }, []);

  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 150);
  };

  return (
    <div style={{ marginTop: "52px" }}>
      <Banner />
      <div className="container lg:max-w-screen-xl mx-auto min-h-[calc(70vh)] my-7">
        <div className="lg:flex mx-4">
          <div className="lg:w-2/3 lg:mr-5">
            <div className="border-b border-[#E5E5E5] relative mb-4 pb-2">
              <h1 className="text-[calc(22px)] font-semibold text-[#182537] inline-block">
                {newDetail?.title}
              </h1>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Image
                    src="/icons/icon-time.svg"
                    width={15}
                    height={15}
                    alt=" "
                  />
                  <p className="text-[calc(13px)] ml-2 text-[#919191]">
                    {timeDateFormat(newDetail?.publishTime)}
                  </p>
                </div>
                <div className="flex">
                  <FacebookShareButton url={link}>
                    <div className="px-[calc(9px)] rounded border border-[#E5E5E5] leading-[calc(0px)] pt-[calc(2px)] mr-2">
                      <Image
                        src="/icons/icon-fb.svg"
                        width={8}
                        height={24}
                        className="leading-none"
                        alt=" "
                      />
                    </div>
                  </FacebookShareButton>
                  <CopyToClipboard text={link} onCopy={handleCopied}>
                    <div
                      className={`px-[calc(6px)] cursor-pointer rounded border border-[#E5E5E5] leading-[calc(0px)] pt-[calc(2px)] ${
                        copied ? ` opacity-30` : ``
                      }`}
                    >
                      <Image
                        src="/icons/icon-coppy-link.svg"
                        width={14}
                        height={24}
                        alt=" "
                      />
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: newDetail?.content,
              }}
            ></div>
          </div>
          <div className="lg:hidden border-b border-[#E5E5E5] my-5" />
          <div className="lg:w-1/3">
            <div className=" border border-[#E5E5E5] p-4">
              <div className="border-b border-[#E5E5E5] relative mb-4">
                <h1 className="text-[calc(22px)] font-semibold pb-2 text-[#182537] inline-block before:content-[''] before:absolute before:-bottom-[calc(1px)] before:w-[calc(129px)] before:h-1 before:bg-[#f89736] before:duration-300 before:-skew-x-[20deg]">
                  Tin liên quan
                </h1>
              </div>
              <div className="grid gap-4">
                {listNew?.map((item: any) => (
                  <NewItem
                    layout="vertical"
                    sideBar={false}
                    item={item}
                    key={item?.newsID}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDetailContainer;
