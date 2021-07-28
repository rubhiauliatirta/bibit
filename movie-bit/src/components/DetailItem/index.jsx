export default function DetailItem({ title, content }) {
  return (
    <div>
      <div className="text-lg font-semibold">{title}</div>
      <div className="ml-4 text-base font-light text-gray-400">{content}</div>
    </div>
  )
}