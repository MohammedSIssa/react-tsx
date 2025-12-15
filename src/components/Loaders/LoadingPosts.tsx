export default function LoadingPosts() {
  const fakePosts = Array.from({ length: 5 });
  return (
    <div className="flex w-full flex-col items-center gap-5 pt-30 md:pt-20">
      {fakePosts.map((_, idx) => (
        // Outer box
        <div
          key={idx}
          className="flex w-full max-w-full animate-pulse flex-col gap-2 border-t-2 border-b-2 border-white/20 bg-white/10 p-3 py-5 shadow-xl shadow-black/10 backdrop-blur-2xl odd:min-h-[200px] even:min-h-[350px] even:delay-200 md:w-fit md:max-w-[700px] md:rounded-xl md:border-2 md:odd:min-w-[600px] md:even:min-w-[700px] [&_div]:rounded-lg"
        >
          {/* Fake title box */}
          <div className="mb-5 w-[40%] animate-pulse bg-white/10 p-5"></div>

          {/* Fake body box */}
          <div className="w-[70%] animate-pulse bg-white/10 p-2"></div>
          <div className="w-[50%] animate-pulse bg-white/10 p-2"></div>
          <div className="w-[60%] animate-pulse bg-white/10 p-2"></div>

          {/* Fake image box */}
          <div className="h-[200px] max-h-[60%] w-full animate-pulse bg-white/10 p-2"></div>
        </div>
      ))}
    </div>
  );
}
