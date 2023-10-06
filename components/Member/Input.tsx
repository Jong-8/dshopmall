export default function Input({
  title,
  name,
  type,
  value,
  onChange,
  readonly = false,
  placeholder = "",
}: InputProps) {
  return (
    <div>
      <div className="mb-5">
        <div className="text-sm mb-3 max-md:text-xs max-md:mb-2">{title}</div>
        <div>
          <input
            name={name}
            type={type}
            value={value}
            className="w-[100%] h-[45px] py-[10px] px-[15px] text-sm border border-[#ddd] max-md:h-[36px]"
            onChange={onChange}
            readOnly={readonly}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
}
