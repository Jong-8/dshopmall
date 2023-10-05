export default function ContentTitle({ title }: ContentTitleProps) {
  return (
    <div className="text-2xl uppercase text-center font-bold p-4 pt-10 tracking-wider max-md:text-[18px] max-md:py-3 max-md:pt-8 max-md:pb-2">
      {title}
    </div>
  );
}
