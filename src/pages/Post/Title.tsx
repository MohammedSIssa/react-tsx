export default function PostTitle({ title }: { title: string }) {
  return (
    <h1 className="mb-3 text-3xl font-bold md:mb-5 md:text-4xl">{title}</h1>
  );
}
