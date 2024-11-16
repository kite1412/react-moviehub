import { InfinitySpin } from "react-loader-spinner";

export default function LoadingIndicator() {
  return <InfinitySpin
    visible={true}
    width="200"
    color="#6100C2"
    ariaLabel="infinity-spin-loading"
  />
}