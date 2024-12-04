// import { Twitch, Twitter } from "lucide-react";
// import Link from "next/link";

// const footerNavs = [
//   {
//     label: "Product",
//     items: [
//       {
//         href: "/",
//         name: "Email Collection",
//       },
//       {
//         href: "/pricing",
//         name: "Pricing",
//       },
//       {
//         href: "/faq",
//         name: "FAQ",
//       },
//     ],
//   },

//   {
//     label: "Community",
//     items: [
//       {
//         href: "/",
//         name: "Discord",
//       },
//       {
//         href: "/",
//         name: "Twitter",
//       },
//       {
//         href: "mailto:hello@chatcollect.com",
//         name: "Email",
//       },
//     ],
//   },
//   {
//     label: "Legal",
//     items: [
//       {
//         href: "/terms",
//         name: "Terms",
//       },

//       {
//         href: "/privacy",
//         name: "Privacy",
//       },
//     ],
//   },
// ];

// const footerSocials = [
//   {
//     href: "",
//     name: "Discord",
//     icon: <Twitch className="h-4 w-4" />,
//   },
//   {
//     href: "",
//     name: "Twitter",
//     icon: <Twitter className="h-4 w-4" />,
//   },
// ];

// export function SiteFooter() {
//   return (
//     <footer>
//       <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
//         <div className="md:flex md:justify-between px-8 p-4 py-16 sm:pb-16 gap-4">
//           <div className="mb-12 flex-col flex gap-4">
//             <Link href="/" className="flex items-center gap-2">
//               <img
//                 src="https://magicui.design/icon.png"
//                 className="h-8 w-8 text-primary"
//               />
//               <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//                 MyTwoney
//               </span>
//             </Link>
//             <p className="max-w-xs">UI Library for Design Engineers</p>
//           </div>
//           <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-3">
//             {footerNavs.map((nav) => (
//               <div key={nav.label}>
//                 <h2 className="mb-6 text-sm tracking-tighter font-medium text-gray-900 uppercase dark:text-white">
//                   {nav.label}
//                 </h2>
//                 <ul className="gap-2 grid">
//                   {nav.items.map((item) => (
//                     <li key={item.name}>
//                       <Link
//                         href={item.href}
//                         className="cursor-pointer text-gray-400 hover:text-gray-200 duration-200 font-[450] text-sm"
//                       >
//                         {item.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row sm:flex sm:items-center sm:justify-between rounded-md border-neutral-700/20 py-4 px-8 gap-2">
//           <div className="flex space-x-5 sm:justify-center sm:mt-0">
//             {footerSocials.map((social) => (
//               <Link
//                 key={social.name}
//                 href={social.href}
//                 className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-600 fill-gray-500 hover:fill-gray-900 dark:hover:fill-gray-600"
//               >
//                 {social.icon}
//                 <span className="sr-only">{social.name}</span>
//               </Link>
//             ))}
//           </div>
//           <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
//             Copyright © {new Date().getFullYear()}{" "}
//             <Link href="/" className="cursor-pointer">
//               MyTwoney
//             </Link>
//             . All Rights Reserved.
//           </span>
//         </div>
//       </div>
//       {/*   <SiteBanner /> */}
//     </footer>
//   );
// }



import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

// type Link = {
// text: string;
// url: string;
// };

// const links: Link[] = [
// { text: "About", url: "#" },
// { text: "Services", url: "#" },
// ];

interface Icon {
icon: JSX.Element;
url: string;
}

const icons: Icon[] = [
{ icon: <InstagramLogoIcon />, url: "https://www.instagram.com" },
{ icon: <LinkedInLogoIcon />, url: "https://www.linkedin.com" },
{ icon: <TwitterLogoIcon />, url: "https://www.twitter.com" },
];

export function SiteFooter() {
return (
  <footer className="px-5 lg:px-10 p-5 max-w-7xl mx-auto">
    <div className="flex flex-col gap-y-5 md:flex-row items-start md:items-center justify-between w-full gap-x-5">
      <div className="flex items-center gap-x-2">
         <h2 className="font-bold text-neutral-900 dark:text-white">
            MyTwoney
          </h2>
      </div>

      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Copyright © {new Date().getFullYear()}{" "}
        <Link href="/" className="cursor-pointer">
          MyTwoney
        </Link>
          . All Rights Reserved.
      </span>
      <div className="flex items-center gap-x-4">
        {icons.map((icon, index) => (
          <a
            key={index}
            href={icon.url}
            className="text-neutral-500 hover:text-neutral-900 hover:dark:text-white text-xl"
          >
            {icon.icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);
}
