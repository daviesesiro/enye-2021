export const Attribute = ({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) => {
  value = name === "LastLogin" ? new Date(value).toDateString() : value;
  let body =
    name === "URL" || name === "Domain Name" ? (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-purple-600"
        href={value as string}
      >
        {value}
      </a>
    ) : (
      <span>{value}</span>
    );

  return (
    <div className="sm:block sm:py-1 flex flex-col items-center">
      <span className="sm:w-36 sm:mt-0 inline-block mt-2 text-gray-500">
        {name}:
      </span>
      {body}
    </div>
  );
};
