import { LuChevronRight } from "react-icons/lu";
import HeroSection from "../components/HeroSection";
import type { IconType } from "react-icons";
import { BsBadge8K } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { MdBatteryAlert } from "react-icons/md";
import realtimeImg from "../assets/realtime.jpeg";
import hostprogramImg from "../assets/hostprogram.jpeg";
import { FaCheck } from "react-icons/fa";
import Footer from "../components/Footer";
import section11Img from "../assets/section1-1-img.jpeg";

const Section1Contents = [
  {
    tag: "Hosts",
    title: "Turn your charger into income",
    description: "Turn your charger into a month income stream",
    button: "Learn",
    image: section11Img,
  },
  {
    tag: "Business",
    title: "Charging Solutions that scale",
    description: "Fleet and corporate charging solutions that scale",
    button: "Explore",
    image:
      "https://swtchenergy.com/uploads/2024/10/20230612_172050-e1729019199635.jpg",
  },
  {
    tag: "Quick link",
    title: "Start here",
    description: "Three ways to use ChargeLink",
    button: "Browse",
    image:
      "https://swtchenergy.com/uploads/2024/10/20230612_172050-e1729019199635.jpg",
  },
];

type CardType = {
  tag?: string;
  icon?: IconType;
  title: string;
  description: string;
  button: string;
  image?: string;
};

const Section2Contents: CardType[] = [
  {
    tag: "Live map",
    title: "Real-time availability",
    description: "See which chargers are free right now.",
    button: "Check",
    image: realtimeImg,
  },

  {
    icon: BsBadge8K,
    title: "Price transparency",
    description: "Residential at ₹8/kWh, commercial at ₹10/kWh",
    button: "View",
  },
  {
    tag: "Admin dashboard",
    title: "Station owners get full control",
    description: "Manage bookings, revenue, and maintenance easily",
    button: "Manage",
    image:
      "https://swtchenergy.com/uploads/2024/10/20230612_172050-e1729019199635.jpg",
  },
  {
    icon: CiBookmark,
    title: "Book slots in advance",
    description: "Reserver your spot and skip the wait",
    button: "Reserve",
  },
  {
    tag: "Host program",
    title: "List your charger and earn",
    description: "Add your station and start earning per session",
    button: "Start",
    image: hostprogramImg,
  },
  {
    icon: MdBatteryAlert,
    title: "Smart battery alerts",
    description: "Stay informed with automatic status updates",
    button: "Enable",
  },
];

const Section4Contents = [
  {
    tag: "First",
    title: "Plug in to the nearest charger",
    description: "Connect your vehical and get started",
    button: "Learn",
    image:
      "https://swtchenergy.com/uploads/2024/10/20230612_172050-e1729019199635.jpg",
  },
  {
    tag: "Second",
    title: "Start charging via app or card",
    description: "Book your slot and begin the charge",
    button: "Book",
    image:
      "https://swtchenergy.com/uploads/2024/10/20230612_172050-e1729019199635.jpg",
  },
  {
    tag: "Third",
    title: "Pay and drive away",
    description: "Finish charging and continue your journey",
    button: "Drive",
    image:
      "https://swtchenergy.com/uploads/2024/10/20230612_172050-e1729019199635.jpg",
  },
];

const CardWithImage = ({ content }: { content: CardType }) => {
  return (
    <div className="flex flex-col rounded-2xl h-full w-full">
      <div className="bg-slate-200 rounded-t-2xl">
        <img
          src={content.image}
          alt={`${content.tag} img`}
          className="w-full h-[300px] rounded-t-2xl object-cover"
        />
      </div>

      <div className="bg-primary px-6 py-6 rounded-b-2xl text-white">
        <div className="space-y-4">
          <p className="text-sm">{content.tag}</p>
          <p className="text-2xl font-semibold">{content.title}</p>

          <p className="text-sm">{content.description}</p>
        </div>

        <button className="flex items-center space-x-4 text-sm mt-10">
          <p>{content.button}</p>

          <LuChevronRight />
        </button>
      </div>
    </div>
  );
};

const CardWithoutImage = ({ content }: { content: CardType }) => {
  return (
    <div className="flex flex-col justify-between rounded-2xl h-full w-full  rounded-b-2xl bg-primary px-6 py-6 text-white">
      {content.icon && <content.icon className="text-white text-3xl" />}
      <div>
        <div className="space-y-4">
          <p className="text-2xl font-semibold">{content.title}</p>

          <p className="text-sm">{content.description}</p>
        </div>

        <button className="flex items-center space-x-4 text-sm mt-8">
          <p>{content.button}</p>

          <LuChevronRight />
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <HeroSection />

      <div className="px-12 pb-16">
        {/* learn, explore and browse section */}
        <div className="flex flex-col items-center justify-center space-y-12 py-20">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-sm font-semibold">Drivers</h2>
            <p className="text-4xl font-semibold">Find your next charge</p>

            <p className="text-base font-light">
              Locate and book fast chargers within minutes
            </p>
          </div>
          <div className="flex items-center justify-center gap-12">
            {Section1Contents.map((content, index) => (
              <div key={index} className="flex flex-col rounded-2xl w-[400px]">
                <div className="bg-slate-200 rounded-t-2xl">
                  <img
                    src={content.image}
                    alt={`${content.tag} img`}
                    className="w-full h-[350px] rounded-t-2xl object-cover"
                  />
                </div>

                <div className="bg-primary px-6 py-6 rounded-b-2xl text-white">
                  <div className="space-y-4">
                    <p className="text-sm">{content.tag}</p>
                    <p className="text-2xl font-semibold">{content.title}</p>

                    <p className="text-sm">{content.description}</p>
                  </div>

                  <button className="flex items-center space-x-4 text-sm mt-10">
                    <p>{content.button}</p>

                    <LuChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* drivers section */}

        <div className="flex flex-col items-center justify-center space-y-12 py-20">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-sm font-semibold">Why ChargeLink</h2>
            <p className="text-4xl font-semibold">
              Built for drivers, hosts and businesses
            </p>

            <p className="text-base font-light">
              Simple use, fast charging, aur earning ka mauka. Sab ek app me.
            </p>
          </div>

          <div className="w-full h-[800px] grid grid-rows-3 grid-cols-3 gap-6">
            <div className=" w-full h-full row-start-1 row-end-3">
              <CardWithImage content={Section2Contents[0]} />
            </div>
            <div className="w-full h-full row-start-1 row-end-2">
              <CardWithoutImage content={Section2Contents[1]} />
            </div>
            <div className="w-full h-full row-start-1 row-end-3">
              <CardWithImage content={Section2Contents[2]} />
            </div>
            <div className=" w-full h-full row-start-3 row-end-3">
              <CardWithoutImage content={Section2Contents[3]} />
            </div>
            <div className="w-full h-full row-start-2 row-end-4">
              <CardWithImage content={Section2Contents[4]} />
            </div>
            <div className="w-full h-full row-start-3 row-end-4">
              <CardWithoutImage content={Section2Contents[5]} />
            </div>
          </div>
        </div>

        {/* coverage section */}
        <div className="flex flex-row flex-1 items-center justify-center gap-12 py-20">
          <div className="text-sm font-semibold flex-[0.5] space-y-6">
            <h2>Coverage</h2>
            <p className="text-4xl font-semibold">
              Nationwide charging network
            </p>
            <p className="text-base font-light">
              Find chargers in your city. Explore the map and see what's near
              you.
            </p>
            <div className="flex space-x-8">
              <button className="flex space-x-4 text-sm mt-8 border border-black px-8 py-3">
                Explore
              </button>
              <button className="flex space-x-2 items-center text-sm mt-8">
                <p>View map</p>
                <LuChevronRight />
              </button>
            </div>
          </div>
          <div className="flex-[0.5]">
            <img
              src="https://i0.wp.com/sunnysidehistory.org/wp-content/uploads/2022/05/2022_05_06_GOOGLEMAPS_SCREENSHOT_SUNNYSIDE.jpg?ssl=1"
              alt="Map image"
              className="w-full h-[600px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* process section */}
        <div className="flex flex-col items-center justify-center space-y-12 py-20">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-sm font-semibold">Process</h2>
            <p className="text-4xl font-semibold">Three simple steps</p>

            <p className="text-base font-light">
              Book, Charge, and Go. It's simple
            </p>
          </div>
          <div className="flex items-center justify-center gap-12">
            {Section4Contents.map((content, index) => (
              <div key={index} className="flex flex-col rounded-2xl w-[400px]">
                <div className="bg-slate-200 rounded-t-2xl">
                  <img
                    src={content.image}
                    alt={`${content.tag} img`}
                    className="w-full h-[350px] rounded-t-2xl object-cover"
                  />
                </div>

                <div className="bg-white px-6 py-6 rounded-b-2xl text-white border-b border-b-black border-l border-r border-l-black border-r-black">
                  <div className="space-y-4">
                    <p className="text-sm text-black">{content.tag}</p>
                    <p className="text-2xl font-semibold text-black">
                      {content.title}
                    </p>

                    <p className="text-sm text-black">{content.description}</p>
                  </div>

                  <button className="flex items-center space-x-4 text-sm mt-10 text-black">
                    <p>{content.button}</p>

                    <LuChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing section */}
        <div className="flex flex-col items-center justify-center space-y-12 py-20">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-sm font-semibold">Rates</h2>
            <p className="text-4xl font-semibold">Transparent pricing</p>

            <p className="text-base font-light">
              Know exactly what you pay before you charge.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-11">
            <div className="flex flex-col p-8 w-[400px] h-[500px] justify-between border border-black">
              <div className="flex flex-col space-y-14">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <p className="text-lg font-semibold">Residential</p>
                  <p className="text-4xl font-bold">₹8/kWh</p>

                  <p className="text-base ">or ₹9999 yearly</p>
                </div>

                <div className="flex flex-col space-y-2">
                  {[
                    "Real-time availability",
                    "Book slots in advance",
                    "No hidden charges",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <FaCheck />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className=" w-full bg-black text-white py-3">
                Calculate
              </button>
            </div>

            <div className="flex flex-col p-8 w-[400px] h-[500px] justify-between border border-black">
              <div className="flex flex-col space-y-14">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <p className="text-lg font-semibold">Business plan</p>
                  <p className="text-4xl font-bold">₹10/kWh</p>

                  <p className="text-base ">or ₹19999 yearly</p>
                </div>

                <div className="flex flex-col space-y-2">
                  {[
                    "Mobile app access",
                    "24/7 customer support",
                    "Priority booking",
                    "Dedicated account manager",
                    "Bulk discounts available",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <FaCheck />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-black text-white py-3">
                Calculate
              </button>
            </div>
          </div>
        </div>


        {/* reviews section*/}
        <div></div>

        
        <Footer />
      </div>
    </>
  );
};

export default Home;
