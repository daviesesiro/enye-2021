export const Button = (props: any) => (
  <button {...props} className={"btn btn-primary " + props.className}>
    {props.children}
  </button>
);
