import { Crown } from "lucide-react";
import formatPower from "../../utils/formatPower";

export default function PodiumBadge({
  place,
  name,
  tag,
  server,
  power,
  color,
  height = 300,
  width = 220,
}) {
  const isMobile = width <= 140;
  return (
    <div
      className={`
        relative
        overflow-visible
        rounded-[32px]
        border-4
        ${color.border}
        ${color.gradient}
        ${color.glow}
        bg-gradient-to-b
        shadow-2xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:scale-[1.03]
        before:absolute
        before:inset-0
        before:rounded-[28px]
        before:bg-gradient-to-b
        before:from-white/10
        before:via-transparent
        before:to-black/20
        before:pointer-events-none
      `}
      style={{
        width,
        height,
      }}
    >
      {place === 1 && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full border border-yellow-400 bg-slate-950 p-2 shadow-[0_0_20px_rgba(234,179,8,0.45)]">
          <Crown
            size={24}
            className="text-yellow-400"
            strokeWidth={2.5}
          />
        </div>
      )}

      <div
  className={`flex h-full flex-col items-center ${
    isMobile ? "px-2 py-3" : "px-4 py-6"
  }`}
>

        <div
          className={`mb-5 h-1 w-20 rounded-full ${color.border.replace(
            "border",
            "bg"
          )}`}
        />

        <div
  className={`${
    isMobile
      ? place === 1
        ? "text-xl"
        : "text-xl -mt-2"
      : "text-3xl"
  } font-extrabold ${color.text}`}
>
          #{place}
        </div>

        <div
  className={`flex flex-col items-center ${
    tag && server
      ? isMobile && place !== 1
        ? "-mt-2"
        : "mt-2"
      : "mt-6"
  }`}
>
          <div
            className={`text-center ${
  isMobile
    ? place === 1
      ? "text-lg"
      : "text-base"
    : "text-3xl"
} font-bold whitespace-nowrap ${color.text}`}
          >
            {name}
          </div>

          {tag && (
            <div className={`mt-2 ${isMobile ? "text-xs" : "text-base"} font-semibold text-slate-300`}>
              [{tag}]
            </div>
          )}

          {server && (
            <div className={`mt-1 ${isMobile ? "text-xs" : "text-base"} font-semibold tracking-wide text-slate-500`}>
              S{server}
            </div>
          )}
        </div>

        <div
  className={`mt-auto pb-1 text-center ${
  isMobile
    ? place === 1
      ? "text-2xl"
      : "text-xl"
    : "text-4xl"
} font-extrabold ${color.text}`}
>
  {formatPower(power)}
</div>

      </div>
    </div>
  );
}