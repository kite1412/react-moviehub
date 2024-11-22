import { InfinitySpin, Oval } from "react-loader-spinner";

export default function LoadingIndicator() {
  return <InfinitySpin
    visible={true}
    width="200"
    color="#6100C2"
    ariaLabel="infinity-spin-loading"
  />
}

export function OvalLoadingIndicator({size = "40"}) {
  return <Oval
    visible={true}
    height={size}
    width={size}
    color="#6100C2"
    ariaLabel="oval-loading"
  />
}