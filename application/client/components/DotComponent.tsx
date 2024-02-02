export default function Dot({ color, size }: { color: string; size: number }) {
  return (
    <span
      style={{
        display: "inline-block",
        height: size,
        width: size,
        backgroundColor: color,
        borderRadius: "50%",
        position: "relative",
      }}
    ></span>
  );
}
