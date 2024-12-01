import wez from "../../../assets/to.jpg";
function ProfileSetting() {
  return (
    <div className=" overflow-y-auto">
      <div className="w-[712px] h-96 relative m-auto  ">
        <img
          className="w-[113px] h-[90px] mt-3  rounded-[100px]"
          src={wez}
        />
        <div className=" left-[30px] top-[100px] absolute flex-col justify-start items-start  inline-flex">
          <div className="self-stretch  flex-col justify-start items-start  flex">
            <div className="self-stretch  flex-col justify-start items-start flex">
              <div className="self-stretch  flex-col justify-start items-start flex">
                <div className="self-stretch  flex-col justify-start items-start gap-1 flex">
                  <div className="self-stretch px-4 justify-start items-start inline-flex">
                    <div className="w-[532px] text-zinc-800 text-xs font-normal font-['Roboto'] leading-3 tracking-tight">
                      Full Names
                    </div>
                  </div>
                  <div className="w-[493px] h-10 relative">
                    <input
                      type="text"
                      className="w-full h-8 pl-4 pr-2 py-2 bg-zinc-100 rounded-md border border-neutral-200 text-zinc-500 text-[15px] font-normal font-['Roboto'] leading-tight outline-none"
                      placeholder="Mpano Toussant"
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[68px] flex-col justify-start items-start flex">
                <div className="self-stretch h-[68px] flex-col justify-start items-start gap-1 flex">
                  <div className="self-stretch px-4 justify-start items-start inline-flex">
                    <div className="grow shrink basis-0 text-zinc-800 text-xs font-normal font-['Roboto'] leading-3 tracking-tight">
                      Email
                    </div>
                  </div>
                  <div className="w-[493px] h-12 relative">
                    <input
                      type="text"
                      className="w-full h-8 pl-4 pr-2 py-2 bg-zinc-100 rounded-md border border-neutral-200 text-zinc-500 text-base font-normal font-['Roboto'] leading-tight outline-none"
                      placeholder="toussant@gmail.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="left-[30px] top-[210px] absolute flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch px-4 justify-start items-start inline-flex">
            <div className="w-[532px] text-zinc-800 text-xs font-normal font-['Roboto'] leading-3 tracking-tight">
              Phone number
            </div>
          </div>
          <div className="w-[493px] h-12 relative">
            <input
              type="text"
              className="w-full h-8 pl-4 pr-2 py-2 bg-zinc-100 rounded-md border border-neutral-200 text-zinc-500 text-base font-normal font-['Roboto'] leading-tight outline-none"
              placeholder="0787537524"
            />
          </div>
        </div>
        <div className=" left-[30px] top-[265px] absolute flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch px-4 justify-start items-start inline-flex">
            <div className="w-[532px] text-zinc-800 text-xs font-normal font-['Roboto'] leading-3 tracking-tight">
              Location
            </div>
          </div>

          <div className="w-[493px] h-12 relative">
            <input
              type="text"
              className="w-full h-8 pl-4 pr-2 py-2 bg-zinc-100 rounded-md border border-neutral-200 text-zinc-500 text-base font-normal font-['Roboto'] leading-tight outline-none"
              placeholder="Kagitumba"
            />
          </div>
        </div>
        <button className="h-[38px] pl-[79px] pr-[62px] pt-[9px] pb-2.5 left-[131px] top-[330px] absolute bg-emerald-800 rounded-[10px] justify-end items-center inline-flex">
          <span className="w-[99px] h-[19px] text-gray-200 text-xs font-normal font-['Roboto']">
            Update Data
          </span>
        </button>
        <button className="px-[15px] pt-2 pb-[7px] left-[223px] top-[55px] absolute bg-emerald-800 rounded-[10px] justify-center items-center inline-flex">
          <span className="text-gray-200 text-xs font-normal font-['Roboto']">
            Update Photo
          </span>
        </button>
        <button className="px-6 pt-2 pb-[7px] left-[365px] top-[55px] absolute bg-emerald-800 rounded-[10px] justify-center items-center inline-flex">
          <span className="text-gray-200 text-xs font-normal font-['Roboto']">
            Remove Photo
          </span>
        </button>
        <div className="w-[172px]  left-[236px] top-[8px] absolute text-black text-xs font-extrabold font-['Roboto'] leading-tight">
          PROFILE PICTURE
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
