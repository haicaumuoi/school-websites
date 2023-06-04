import { RightSquareFilled, LeftSquareFilled } from "@ant-design/icons";
export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      <RightSquareFilled />
    </div>
  );
};

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <RightSquareFilled className="w-52 h-52 z-10 relative" />
    </div>
  );
};
