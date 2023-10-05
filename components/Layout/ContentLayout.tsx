export default function ContentLayout({ children }: AppLayoutProps) {
  return (
    <div className="pt-[100px] max-w-[1080px] m-auto max-md:pt-[58px]">
      {children}
    </div>
  );
}
