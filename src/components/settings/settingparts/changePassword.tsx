const changePassword = () => {
  return (
    <div className="w-[712px] h-[631px] relative m-auto">
      <div className="h-40 left-[93px] top-[42px] absolute flex-col justify-start items-start gap-6 inline-flex">
        <div className="self-stretch h-[68px] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch px-4 justify-start items-start inline-flex">
            <div className="grow shrink basis-0 text-zinc-800 text-base font-normal font-['Roboto'] leading-3 tracking-tight">
              Old Password
            </div>
          </div>
          <input
            type="password"
            className="w-[493px] h-12 relative bg-zinc-100 rounded-md border border-neutral-200 pl-4 pr-2 py-2  justify-between items-center inline-flex"
            placeholder="Enter old Password"
          />
        </div>
        <div className="self-stretch h-[68px] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch px-4 justify-start items-start inline-flex">
            <div className="grow shrink basis-0 text-zinc-800 text-base font-normal font-['Roboto'] leading-3 tracking-tight">
              New Password
            </div>
          </div>
          <input
            type="password"
            className="w-[493px] h-12 relative bg-zinc-100  border border-neutral-200 pl-4 pr-2 py-2  rounded-md justify-between items-center inline-flex"
            placeholder="Enter New Password"
          />
        </div>
      </div>
      <div className="h-[68px] left-[93px] top-[223px] absolute flex-col justify-start items-start gap-2 inline-flex">
        <div className="self-stretch px-4 justify-start items-start inline-flex">
          <div className="grow shrink basis-0 text-zinc-800 text-base font-normal font-['Roboto'] leading-3 tracking-tight">
            Confirm Password
          </div>
        </div>
        <input
          type="password"
          className="w-[493px] h-12 relative bg-zinc-100 rounded-md border border-neutral-200 pl-4 pr-2 py-2  justify-between items-center inline-flex"
          placeholder="Confirm Password"
        />
      </div>
      <button className="h-[38px] pl-[79px] pr-[62px] pt-[9px] pb-2.5 left-[198px] top-[350px] absolute bg-emerald-800 rounded-[10px] justify-end items-center inline-flex">
        <span className="w-[99px] h-[19px] text-gray-200 text-sm font-normal font-['Roboto']">
          Update Data
        </span>
      </button>
    </div>
  );
};

export default changePassword;
