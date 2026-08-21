import { VideoText } from "@/components/ui/video-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { profile } from "@/data/content";

export function HeroVideoDemo() {
  return (
    <div className="flex flex-col items-center gap-8 sm:gap-10">
      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-12">
        <VideoText
          src="video/bg.mp4"
          webmSrc="video/bg.webm"
          poster="video/bg-poster.jpg"
          lines={["KRISTOPHER", "ASTUDILLO"]}
          className="h-40 max-w-xl sm:h-56 lg:h-64"
        />

        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-sky-400/25 blur-2xl" />
          <img
            src={profile.photo}
            alt={`Retrato de ${profile.fullName}`}
            width={256}
            height={256}
            loading="eager"
            className="relative h-40 w-40 rounded-full border border-white/10 object-cover shadow-[0_0_40px_-8px_rgba(56,189,248,0.55)] sm:h-52 sm:w-52 lg:h-64 lg:w-64"
          />
        </div>
      </div>

      <TextAnimate
        as="p"
        animation="blurInUp"
        by="word"
        className="justify-center text-center text-base font-medium text-neutral-300 sm:text-lg"
      >
        Desarrollador Full Stack Jr - Analista Programador
      </TextAnimate>
    </div>
  );
}
