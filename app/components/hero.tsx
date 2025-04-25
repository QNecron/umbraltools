import Desktop from "../images/hero_desktop_16-9.webp";
import Mobile from "../images/hero_mobile_9-16.webp";
import Logo from "../images/logo-sd-white.webp";

interface propsHero {
  type?: string;
  position?: string;
  imgDesktop?: string;
  imgDesktopHeight?: number;
  imgDesktopWidth?: number;
  imgMobile?: string;
  imgMobileHeight?: number;
  imgMobileWidth?: number;
  heading?: number;
  title: string;
  copy?: string;
  logo?: boolean;
  animation?: boolean;
}

export default function Hero({
  type = "default", 
  position = "center", 
  imgDesktop = Desktop,
  imgDesktopHeight = 1080,
  imgDesktopWidth = 1920,
  imgMobile = Mobile,
  imgMobileHeight = 1080,
  imgMobileWidth = 608,
  heading = 1, 
  title, 
  copy,
  logo,
  animation = false
}: propsHero) {

  const Title = heading === 1 ? "h1" : "h2";
  const Animation = animation === true ? " hero__fun" : "";
  
  return(
    <section className={"hero" + Animation} hero={type + " " + position}>
      <picture className="hero__asset" aria-hidden="true">
        <source srcSet={imgDesktop} height={imgDesktopHeight} width={imgDesktopWidth} media="(min-width: 768px)" />
        <img src={imgMobile} className="hero__asset-img" height={imgMobileHeight} width={imgMobileWidth} alt="" />
      </picture>
      {animation && <div className="hero__animation one"></div>}
      {animation && <div className="hero__animation two"></div>}
      <div className="hero__grid wrapper" wrapper="stucture">
        <div className="hero__content">
          <Title className="hero__title" heading="1">{title}</Title>
          {copy && <p className="hero__copy">{copy}</p>}
          {logo && <img src={Logo} className="hero__logo" height="211" width="512" alt="Designed for use with ShadowDark" />}
        </div>
      </div>
    </section>
  );
  
};