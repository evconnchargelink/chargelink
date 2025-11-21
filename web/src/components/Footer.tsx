import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import logoImg from "/logo.png";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col space-y-3">
      {/* main footer */}
      <div className="flex items-start  justify-between p-10 border border-black">
        <div className="flex flex-col space-y-8 ">
          <img
            src={logoImg}
            alt="chargelink logo"
            className="w-[150px] object-contain"
          />

          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm">Address</p>
            <p className="text-xs">
              Bangalore, India. EV charging networks headquarter
            </p>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm">Contact</p>

            <div className="flex items-center space-x-4 text-xs">
              <p>+91 80972526262</p>
              <p>support@chargelink.com</p>
            </div>
          </div>

          <div className="flex item-center space-x-6 text-xl">
            <FaFacebook />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedin />
            <FaYoutube />
          </div>
        </div>

        <div className="flex items-center space-x-15 mt-5">
          <div>
            <ul className="space-y-4 text-sm font-medium">
              <li>Find charger</li>
              <li>Become host</li>
              <li>For business</li>
              <li>About us</li>
              <li>News</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-4 text-sm font-medium">
              <li>Partners</li>
              <li>Contact us</li>
              <li>Login</li>
              <li>Download app</li>
              <li>Pricing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* copy right and privacy policy links */}
      <div className="flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-600">© 2025 ChargeLink. All rights reserved.</p>
            </div>

            <div className="flex items-center space-x-4 text-xs text-slate-600 [&>a]:underline">
                <Link to={"/"}>Privacy Policy</Link>
                <Link to={"/"}>Terms of Use</Link>
                <Link to={"/"}>Cookie settings</Link>
            </div>
      </div>
    </footer>
  );
};

export default Footer;
