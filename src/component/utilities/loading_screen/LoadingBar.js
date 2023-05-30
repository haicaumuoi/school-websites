import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import * as LoadingSlice from "../../../redux/slices/loading/LoadingSlice";

export default function TopLoading() {
  const active = useSelector(LoadingSlice.isActive);

  const ref = useRef(null);
  useEffect(() => {
    if (active) {
      ref.current.continuousStart();
    } else {
      ref.current.complete();
    }
  }, [active]);
  return (
    <div>
      <LoadingBar
        style={{
          background: '#fff',
        }}
        color={'#fff'}
        ref={ref}
        height={4}
      />
    </div>
  );
}
