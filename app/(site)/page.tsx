import Image from "next/image";
import AuthPage from "./components/AuthPage";

export default function Home() {
  return (
    <div
      className="
    flex 
    min-h-screen
    flex-col 
    justify-center
    px-6
    py-6 
    sm:px-6 
    lg:px-0
    lg:py-0
    sm:py-6
    bg-gray-100
  "
    >
      <div className="lg:w-full lg:flex lg:flex-row justify gap-12 lg:h-screen ">
        <div className="lg:bg-[#dc1a22] lg:flex lg:flex-col lg:justify-center lg:w-1/3">
          <Image
            height="16"
            width="16"
            className="mx-auto w-auto"
            src="/images/jvl-logo.gif"
            alt="Logo"
          />
        </div>

        <div className="lg:flex lg:flex-col lg:justify-center lg:w-2/3 ">
          <h2
            className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
          >
            Sign in to your account
          </h2>
          <AuthPage />
        </div>
      </div>
    </div>
  );
}
