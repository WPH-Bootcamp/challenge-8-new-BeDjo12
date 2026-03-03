import Logo from "../../ui/Logo";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full h-30 gap-2 py-6 px-4 md:px-10 lg:px-35 border-t border-neutral-800 ">
      <Logo />
      <p className="text-[12px]/[24px] md:text-[16px]/[30px] font-normal text-neutral-600 ">
        Copyright ©2025 Movie Explorer
      </p>
    </div>
  );
};

export default Footer;
