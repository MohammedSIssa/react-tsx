import { useState } from "react";

export default function PostBody({
  body,
  showAllText = false,
}: {
  body: string;
  showAllText?: boolean;
}) {
  const [showMore, setShowMore] = useState(body?.length < 60);

  function detectDirection(text: string) {
    const arabicRegex = /[\u0600-\u06FF]/; // Arabic Unicode block
    return arabicRegex.test(text) ? "rtl" : "ltr";
  }

  const dir = detectDirection(body);

  return (
    <>
      {(showMore || showAllText) && (
        <div className={`flex flex-col gap-2 py-2`}>
          <pre dir={dir} className="max-w-full md:max-w-[700px]">
            {body}
          </pre>
        </div>
      )}
      {showMore || (
        <div className="py-2">
          {!showAllText && (
            <pre dir={dir} className="max-w-full md:max-w-[700px]">
              {body?.slice(0, 60)}...{" "}
              <button
                className="text-zinc-500 hover:cursor-pointer hover:text-zinc-300"
                onClick={() => setShowMore(true)}
              >
                عرض المزيد
              </button>
            </pre>
          )}
        </div>
      )}
    </>
  );
}
