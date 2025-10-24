import Desktop from "../images/hero_desktop_16-9.webp";
import Mobile from "../images/hero_mobile_9-16.webp";
import Logo from "../images/logo-sd-white.webp";

interface propsHero {
  theme?: string;
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
}

export default function Hero({
  theme = "default",
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
  logo
}: propsHero) {

  const Title = heading === 1 ? "h1" : "h2";

  return(
    <section className="hero" hero={theme + " " + position}>
      <picture className="hero__asset">
        <source
          srcSet={imgDesktop}
          height={imgDesktopHeight}
          width={imgDesktopWidth}
          media="(min-width: 768px)"
        />
        <img
          src={imgMobile}
          className="hero__asset-img"
          height={imgMobileHeight}
          width={imgMobileWidth}
          fetchpriority="high"
          aria-hidden="true"
          alt=""
        />
      </picture>
      <div className="hero__grid wrapper" wrapper="stucture">
        <div className="hero__content">
          <Title className="hero__title" heading="1">{title}</Title>
          {copy &&
            <p className="hero__copy">{copy}</p>
          }
          {logo &&
            <img
              src={Logo}
              className="hero__logo"
              height="211"
              width="512"
              alt="Designed for use with ShadowDark"
            />}
        </div>
      </div>
    </section>
  );

}
