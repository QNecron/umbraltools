import { Link } from "@remix-run/react";

interface propsCard {
  theme?: string;
  image?: string;
  imageHeight?: number;
  imageWidth?: number;
  title: string;
  badge?: string;
  copy1?: string;
  copy2?: string;
  copy3?: string;
  copy4?: string;
  copy5?: string;
  copy6?: string;
  ctaUrl?: string;
  ctaCopy?: string;
}

export default function Wrapper({
  theme = "content",
  image,
  imageHeight,
  imageWidth,
  title,
  badge,
  copy1,
  copy2,
  copy3,
  copy4,
  copy5,
  copy6,
  ctaUrl,
  ctaCopy
}: propsCard) {

  return(
    <article className="card" card={theme}>
      {image &&
        <div className="card__asset">
          <img 
            src={image} 
            className="card__asset-img" 
            height={imageHeight} 
            width={imageWidth} 
            alt="" 
            aria-hidden="true" 
          />
        </div>
      }
      <div className="card__content">
        <h2 className="card__title" heading="3">{title}</h2>
        {badge && <div className="card__badge">{badge}</div>}
        {copy1 && <div className="card__copy card__copy-1">{copy1}</div>}
        {copy2 && <div className="card__copy card__copy-2">{copy2}</div>}
        {copy3 && <div className="card__copy card__copy-3">{copy3}</div>}
        {copy4 && <div className="card__copy card__copy-4">{copy4}</div>}
        {copy5 && <div className="card__copy card__copy-5">{copy5}</div>}
        {copy6 && <div className="card__copy card__copy-6">{copy6}</div>}
        {ctaUrl && 
          <Link to={ctaUrl} className="card__cta btn" button="secondary">
            {ctaCopy}
          </Link>
        }
      </div>
    </article>
  );
  
};