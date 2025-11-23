import { LuChevronRight } from "react-icons/lu";
import HeroSection from "../components/HeroSection";
import type { IconType } from "react-icons";
import { BsBadge8K } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { MdBatteryAlert } from "react-icons/md";
import realtimeImg from "../assets/realtime.jpeg";
import hostprogramImg from "../assets/hostprogram.jpeg";
import Footer from "../components/Footer";
import section11Img from "../assets/section1-1-img.jpeg";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Slider from "../components/Slider";
import { cn } from "../utils/cn.util";

const currencyData = {
  USD: { symbol: "$", rate: 1, max: 20, step: 0.5 },
  EUR: { symbol: "€", rate: 0.93, max: 18.5, step: 0.5 },
  GBP: { symbol: "£", rate: 0.79, max: 16, step: 0.5 },
  INR: { symbol: "₹", rate: 83.5, max: 1670, step: 10 },
};

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
  const [currentTab, setCurrentTab] = useState<string>("Quick setup");
  const [hours, setHours] = useState([8]);
  const [days, setDays] = useState([5]);
  const [price, setPrice] = useState([420]); // Initial price set to roughly 5 USD in INR (5 * 83.5 = 417.5)
  const [currency, setCurrency] = useState("INR"); // Default currency set to INR
  const prevCurrencyRef = useRef("INR"); // Initial previous currency set to INR

  const currentCurrency = currencyData[currency as keyof typeof currencyData];

  // Corrected logic: Price in the slider is ALWAYS in the selected currency.
  const monthlyEarnings = hours[0] * days[0] * price[0] * 4.33;

  const earningsSpring = useSpring(monthlyEarnings, {
    mass: 0.8,
    stiffness: 100,
    damping: 20,
  });
  const displayEarnings = useTransform(earningsSpring, (current) =>
    Math.floor(current).toLocaleString("en-US")
  );

  useEffect(() => {
    earningsSpring.set(monthlyEarnings);
  }, [monthlyEarnings, earningsSpring]);

  // Effect to convert price when currency changes
  useEffect(() => {
    const prevRate =
      currencyData[prevCurrencyRef.current as keyof typeof currencyData]
        ?.rate || 1;
    const newRate =
      currencyData[currency as keyof typeof currencyData]?.rate || 1;

    if (prevCurrencyRef.current !== currency) {
      setPrice((prev) => [(prev[0] / prevRate) * newRate]);
      prevCurrencyRef.current = currency;
    }
  }, [currency]);

  return (
    <div>
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

                <div className="bg-white px-6 py-6 rounded-b-2xl text-white border-b border-b-black/30 border-l border-r border-l-black/30 border-r-black/30">
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

        {/* earn from your charger auto scroll section */}
        <div className="flex flex-col items-center justify-center space-y-16 py-20">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-sm font-semibold">Hosts</h2>
            <p className="text-4xl font-semibold">Earn from your charger</p>

            <p className="text-base font-light">
              List your station in minutes and start earning per session. Weekly
              payouts keep the money flowing.
            </p>

            <div className="flex space-x-8">
              <button className="flex space-x-4 text-sm mt-8 border border-black px-8 py-3">
                Start
              </button>
              <button className="flex space-x-2 items-center text-sm mt-8">
                <p>Learn</p>
                <LuChevronRight />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex items-center space-x-10">
              {["Quick setup", "Weekly payout", "Smart updates"].map(
                (item, index) => (
                  <div
                    key={index}
                    className={`text-sm pb-2 cursor-pointer ${
                      currentTab === item
                        ? "font-semibold border-b-2 border-black"
                        : "font-normal"
                    }`}
                    onClick={() => setCurrentTab(item)}
                  >
                    <p>{item}</p>
                  </div>
                )
              )}
            </div>

            <div className="flex flex-row flex-1 items-center justify-center gap-12 py-10">
              <div className="text-sm font-semibold flex-[0.5] space-y-6">
                <h2>Setup</h2>
                <p className="text-4xl font-semibold">
                  List in two minutes flat
                </p>
                <p className="text-base font-light">
                  Add your charger to the network and begin accepting bookings
                  immediately.
                </p>
                <div className="flex space-x-8">
                  <button className="flex space-x-4 text-sm mt-8 border border-black px-8 py-3">
                    List
                  </button>
                  <button className="flex space-x-2 items-center text-sm mt-8">
                    <p>Explore</p>
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
            <div className="py-5">
              <motion.div
                className="max-w-4xl mx-auto px-4 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className=" bg-white sm:px-16 w-[600px] py-12 rounded-2xl shadow-xl border border-gray-100">
                  <div className="text-center mb-8">
                    <p className="text-lg text-gray-600">
                      Potential Monthly Earnings
                    </p>
                    <p className="text-6xl sm:text-8xl font-black text-black tracking-tighter my-2">
                      {currentCurrency.symbol}
                      <motion.span>{displayEarnings}</motion.span>
                    </p>
                    <div className="flex justify-center gap-2 mt-4">
                      {Object.entries(currencyData).map(([curr]) => (
                        <button
                          key={curr}
                          onClick={() => setCurrency(curr)}
                          className={cn(
                            "px-3 py-1 text-sm font-semibold rounded-full transition-all",
                            currency === curr
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          )}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="max-w-xl mx-auto mt-12 space-y-10">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center font-medium">
                        <label>Hours available per day</label>
                        <span className="font-bold text-lg">
                          {hours[0]} hrs
                        </span>
                      </div>
                      <Slider
                        value={hours}
                        onValueChange={setHours}
                        max={24}
                        step={1}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center font-medium">
                        <label>Active days per week</label>
                        <span className="font-bold text-lg">
                          {days[0]} days
                        </span>
                      </div>
                      <Slider
                        value={days}
                        onValueChange={setDays}
                        max={7}
                        step={1}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center font-medium">
                        <label>Your price per hour</label>
                        <span className="font-bold text-lg">
                          {currentCurrency.symbol}
                          {price[0].toFixed(currentCurrency.step >= 1 ? 0 : 2)}
                        </span>
                      </div>
                      <Slider
                        value={price}
                        onValueChange={setPrice}
                        max={currentCurrency.max}
                        step={currentCurrency.step}
                      />
                    </div>
                  </div>

                  <div className="mt-12">
                    <button className="bg-black text-white px-5 py-3 rounded-xl">Start Earning Now</button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      {/* reviews section*/}
      <div className="flex flex-col items-center justify-center space-y-12 py-20">
        <div className="flex flex-col items-center justify-center space-y-8">
          <p className="text-4xl font-semibold">
            Drivers and hosts love ChargeLink
          </p>

          <p className="text-base font-light">
            Real stories from real people using network
          </p>
        </div>

        <div className="grid grid-cols-3 gap-14">
          <div className="flex flex-col items-center justify-center space-y-10">
            <p className="text-center text-lg font-semibold">
              "I found a charger in minutes and was back on the road. No stress,
              no surprises."
            </p>

            <div className="flex flex-col space-y-6 items-center justify-center">
              <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>

              <div className="flex flex-col space-y-1 items-center justify-center">
                <p>Rajesh kumar</p>
                <p className="text-xs font-light">Driver, Jaipur</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-10">
            <p className="text-center text-lg font-semibold">
              "I found a charger in minutes and was back on the road. No stress,
              no surprises."
            </p>

            <div className="flex flex-col space-y-6 items-center justify-center">
              <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>

              <div className="flex flex-col space-y-1 items-center justify-center">
                <p>Rajesh kumar</p>
                <p className="text-xs font-light">Driver, Jaipur</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-10">
            <p className="text-center text-lg font-semibold">
              "I found a charger in minutes and was back on the road. No stress,
              no surprises."
            </p>

            <div className="flex flex-col space-y-6 items-center justify-center">
              <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>

              <div className="flex flex-col space-y-1 items-center justify-center">
                <p>Rajesh kumar</p>
                <p className="text-xs font-light">Driver, Jaipur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* newsletter section */}
      <div className="flex flex-col items-center justify-center space-y-12 py-20">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="space-y-2">
            <p className="text-4xl font-semibold text-center">Stay</p>
            <p className="text-4xl font-semibold text-center"> in the loop</p>
          </div>

          <p className="text-sm font-light text-center">
            Get updates on new stations, special offers, and charging tips
            delivered to your inbox
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex items-center space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="py-3 px-4 border border-black w-[300px] text-sm"
            />

            <button className="py-3 px-4 bg-black text-white text-sm">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-center font-light">
            We respect your inbox. Unsubscribe at any time.
          </p>
        </div>
      </div>

      <Footer />
      </div>
    </div>
  );
};

export default Home;
