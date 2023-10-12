'use client';

import clsx from "clsx";

import useConversation from "../hooks/useConversation";
import Banner from "../components/Banner";

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div className={clsx(
      'lg:pl-80 h-full lg:block', 
      isOpen ? 'block' : 'hidden'
    )}>
      <Banner />
    </div>
  )
}

export default Home;