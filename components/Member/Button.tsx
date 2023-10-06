export default function Button({
  text,
  type,
  width = "w-[240px] max-md:w-[200px]",
  height = "h-[54px] max-md:h-[48px]",
  rounded = "rounded-[16px] max-md:rounded-[12px]",
  theme = "black",
  name = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${width} ${height} ${rounded} ${
        theme === "black"
          ? "bg-[#7862a2] text-white md:hover:bg-[#7862a2]/80"
          : "border border-[#7862a2] text-[#7862a2] md:hover:bg-[#7862a2] md:hover:text-white"
      } ease-in-out duration-300 max-md:text-sm`}
      name={name}
    >
      {text}
    </button>
  );
}
