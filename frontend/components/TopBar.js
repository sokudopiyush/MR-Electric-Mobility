import { IconCheck } from "@/components/Icons";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <IconCheck width={15} height={15} />
        <span>
          Authorised Distributor of <strong>Sokudo Electric India</strong>
        </span>
      </div>
    </div>
  );
}
