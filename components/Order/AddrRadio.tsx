export default function AddrRadio({
  id,
  label,
  defaultChecked,
}: AddrRadioProps) {
  return (
    <div className="relative mr-3 max-md:mr-2">
      <input
        type="radio"
        name="select_addr"
        id={id}
        className="w-0 h-0 absolute top-0 left-0 peer"
        defaultChecked={defaultChecked}
      />{" "}
      <label
        htmlFor={id}
        className="flex items-center group opacity-50 peer-checked:font-bold peer-checked:opacity-100 max-md:text-sm"
      >
        <span className="relative block w-4 h-4 rounded-[50%] border border-[#aeaeae] mr-1 after:hidden after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-[#7a1cea] peer-checked:group-[]:after:block max-md:w-[14px] max-md:h-[14px] max-md:after:w-[8px] max-md:after:h-[8px]"></span>{" "}
        {label}
      </label>
    </div>
  );
}
