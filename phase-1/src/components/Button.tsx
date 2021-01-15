export const Button = (props: any) => (
  <button
    {...props}
    className={
      "disabled:bg-gray-700 p-2 px-5 bg-purple-700 duration-200 hover:bg-purple-900 rounded-md " +
      props.className
    }
  >
    {props.children}
  </button>
);
