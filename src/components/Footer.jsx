import { useTranslation } from "react-i18next";
import { getOptimizedUrl } from "../utils/cloudinary.js";
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
    const { t } = useTranslation();

    const logo = getOptimizedUrl("MindScan/Petroshore-White-Logo");

    return (
        <footer className="flex flex-row justify-between">
            <img src={logo} alt="Logo-Petroshore" width={400} height={94}/>

            <a href="/product">Product</a>
            <LanguageSelector />
        </footer>
    );
};

export default Footer;