import { useState } from "react";
import type { Movie } from "../types/movie";
import Header from "./Container/Header/Header";
import Hero from "./Container/Hero/Hero";
import Popular from "./Container/Popular/Popular";
import NewRelease from "./Container/NewRelease/NewRelease";
import Footer from "./Container/Footer/Footer";

function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  return (
    <>
      <div className="bg-black cursor-default flex justify-center text-[#fdfdfd] font-[Poppins] ">
        <div className="w-full flex flex-col max-w-360">
          <Header onSelect={setSelectedMovie} />
          <Hero movie={selectedMovie} />
          <Popular onSelect={setSelectedMovie} />
          <NewRelease onSelect={setSelectedMovie} />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
