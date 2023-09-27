export default function Button({
  text,
  type,
  width = "w-[240px]",
  height = "h-[54px]",
  rounded = "rounded-[16px]",
  theme = "black",
  name = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${width} ${height} ${rounded} ${
        theme === "black"
          ? "bg-[#7862a2] text-white hover:bg-[#7862a2]/80"
          : "border border-[#7862a2] text-[#7862a2] hover:bg-[#7862a2] hover:text-white"
      } ease-in-out duration-300`}
      name={name}
    >
      {text}
    </button>
  );
}
