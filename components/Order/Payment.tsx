export default function Payment({
  id,
  label,
  defaultChecked = false,
}: PaymentProps) {
  return (
    <div className="relative">
      <input
        type="radio"
        name="payment"
        id={id}
        className="w-0 h-0 absolute top-0 left-0 peer"
        defaultChecked={defaultChecked}
      />{" "}
      <label
        htmlFor={id}
        className="flex items-center group opacity-50 border border-[#e0e0e0] rounded-md py-4 px-5 peer-checked:font-bold peer-checked:opacity-100 max-md:text-sm max-md:px-4"
      >
        <span className="relative block w-4 h-4 rounded-[50%] border border-[#aeaeae] mr-2 after:hidden after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-[#7a1cea] peer-checked:group-[]:after:block max-md:w-[14px] max-md:h-[14px] max-md:after:w-[8px] max-md:after:h-[8px]"></span>{" "}
        {defaultChecked} {label}
      </label>
    </div>
  );
}
