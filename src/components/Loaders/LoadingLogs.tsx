export default function LoadingLogs() {
  const fakeRows = Array.from({ length: 20 });
  return (
    <div className="flex items-center justify-center pb-20">
      <table
        className="w-full animate-pulse border-b-2 border-white/20 shadow-xl shadow-black/10 md:w-[500px] md:border-2 [&_tr]:h-10"
        dir="ltr"
      >
        <thead dir="ltr">
          <tr className="bg-white/40 backdrop-blur-2xl [&_th]:p-5">
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody
          dir="ltr"
          className="[&_td]:p-8 [&_tr]:p-8 [&_tr]:odd:bg-white/10 [&_tr]:even:bg-white/20"
        >
          {fakeRows.map((_, idx) => (
            <tr key={idx}>
              <td></td>
              <td dir="ltr">
                <small></small>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
