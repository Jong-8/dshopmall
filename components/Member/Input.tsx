export default function Input({
  title,
  name,
  type,
  value,
  onChange,
  readonly = false,
  required = false,
  placeholder = "",
  text = "",
}: InputProps) {
  return (
    <div>
      <div className="mb-5 max-md:mb-4">
        <div className="text-sm mb-3 max-md:text-xs max-md:mb-2">{title}</div>
        <div>
          <input
            name={name}
            type={type}
            value={value}
            className="w-[100%] h-[45px] py-[10px] px-[15px] text-sm border border-[#ddd] rounded-none max-md:h-[40px] max-md:text-xs max-md:px-[10px]"
            onChange={onChange}
            readOnly={readonly}
            required={required}
            placeholder={placeholder}
          />
          {text && text === "잘못된 추천코드입니다." ? (
            <div className="text-red-500 mt-1">{text}</div>
          ) : (
            <div className="text-[#6846b7] mt-1">{text}</div>
          )}
        </div>
      </div>
    </div>
  );
}
