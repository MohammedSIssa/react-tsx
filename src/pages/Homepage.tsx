import WaveHand from "../components/HomeIcons/WaveHello";

export default function Homepage() {
  return (
    <div className="relative flex flex-col items-center pt-30 md:pt-0">
      <h1 className="animation-fade-in mb-2 w-[200px] text-right text-2xl font-bold">
        مرحبا،
      </h1>
      <div className="animation-wave mb-5">
        <span className="hidden md:block">
          <WaveHand />
        </span>
        <span className="md:hidden">
          <WaveHand size="120px" />
        </span>
      </div>
      <div>
        <h1 className="typing mt-30 font-bold">
          أنا محمد وهذا مكاني الخاص لتوثيق رحلتي
        </h1>
      </div>
    </div>
  );
}
