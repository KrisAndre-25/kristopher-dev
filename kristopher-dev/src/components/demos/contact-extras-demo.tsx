import { LocationCard } from "@/components/ui/location-card";
import { ShareButton } from "@/components/ui/share-button";
import { RatingStars } from "@/components/ui/rating-stars";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";

export function ContactExtrasDemo() {
  const { profile } = useContent();
  const t = useUiStrings().contacto.extras;
  const [city, country] = profile.location.split(", ");

  return (
    <div className="flex w-full max-w-[24rem] flex-col items-center gap-6 pt-6">
      <LocationCard city={city} country={country} label={t.locationLabel} />
      <ShareButton shareTitle={t.shareText} buttonLabel={t.shareButton} />
      <RatingStars heading={t.ratingHeading} thanks={t.ratingThanks} levelLabels={t.ratingLevels} />
    </div>
  );
}
