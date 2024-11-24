// import React from 'react';
// import { Button } from "@/components/ui/button";
// import Particles from "@/components/ui/particles";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { BorderBeam } from "@/components/ui/border-beam";

// const HeroSection = () => {
//   return (
//     <section>
//     <div className="relative min-h-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
//       <Particles
//         className="absolute inset-0 opacity-50"
//         quantity={200}
//         staticity={30}
//         color="#a1a1aa"
//         shape="circle"
//       />

//       <div className="relative z-10 text-center px-4 max-w-[80rem] mx-auto mt-20">
//         <motion.h1 
//           className="text-5xl md:text-7xl font-bold text-zinc-100 mb-6 font-sans"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           {/* Know Your Finances, <br />Plan Your Future */}
//           Master Your Financial Future
//         </motion.h1>
//         <motion.p 
//           className="text-xl md:text-2xl text-zinc-300 mb-12"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//         >
//           Effortlessly track your cash flow and stay ahead of your <br /> bills with precision forecasting.
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//         >
//           <Button className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-8 py-3 rounded-full text-lg font-semibold">
//             Get Started
//           </Button>
//         </motion.div>
//       </div>

//       <motion.div 
//         className="relative mt-16 w-full max-w-[75rem] h-[50rem] md:h-[40rem] lg:h-[50rem] xl:h-[60rem]"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.8 }}
//       >
//         {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-yellow-900 via-yellow-500 to-transparent rounded-full opacity-30 blur-3xl"></div> */}
//         <div className="absolute top-[-15%] left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-yellow-900 via-yellow-700 to-transparent rounded-full opacity-30 blur-[200px]"></div>
//         <div className="relative bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
//           <Image
//             src="/dashboard-preview.png"
//             alt="Dashboard Preview"
//             width={1400}
//             height={788}
//             className="w-full h-auto border border-white/10 rounded-2xl"
//           />
//           <BorderBeam size={250} duration={12} delay={9} />
//           {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-zinc-950 via-80% to-zinc-950"></div> */}
//         </div>
//           <div className="absolute h-[65%] inset-0 bg-gradient-to-b from-transparent from-30% via-zinc-950 via-80% to-transparent"></div>
//       </motion.div>
//     </div>
//     </section>
//   );
// };

// export default HeroSection;

import React from 'react';
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import Image from "next/image";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-zinc-950 overflow-hidden">
      <Particles
        className="absolute inset-0 opacity-50"
        quantity={100}
        staticity={50}
        color="#a1a1aa"
        shape="circle"
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[80rem] mx-auto mt-8 sm:mt-12 lg:mt-20">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-zinc-100 mb-4 sm:mb-6 font-sans"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master Your Financial Future
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Effortlessly track your cash flow and stay ahead of your bills with precision forecasting.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold">
              Get Started
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="relative mt-12 sm:mt-16 w-full max-w-[75rem] h-[30rem] sm:h-[35rem] md:h-[40rem] lg:h-[50rem] xl:h-[60rem]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* <div className="absolute top-[-15%] left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-yellow-900 via-yellow-700 to-transparent rounded-full opacity-30 blur-[100px]"></div> */}
          <div className="absolute top-[-15%] left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-yellow-900 via-yellow-700 to-transparent rounded-full opacity-30 blur-[200px]"></div>
          <div className="relative bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
            <Image
              src="/dashboard-preview.png"
              alt="Dashboard Preview"
              width={1400}
              height={788}
              className="w-full h-auto border border-white/10 rounded-2xl"
            />
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950"></div> */}
          <div className="absolute h-[65%] inset-0 bg-gradient-to-b from-transparent from-30% via-zinc-950 via-80% to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;