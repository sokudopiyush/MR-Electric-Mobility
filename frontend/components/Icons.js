// Lightweight inline SVG icons (stroke = currentColor) so we never rely on emoji.
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function Logo({ className }) {
  return (
    <svg className={className} width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" rx="9" stroke="currentColor" strokeWidth="2.4" />
      <path d="M22 9 L13 22 H19 L18 31 L27 17 H21 L22 9 Z" fill="currentColor" />
    </svg>
  );
}

export const IconRange = (p) => (
  <svg {...base} {...p}><path d="M3 12a9 9 0 1 1 18 0" /><path d="M12 12l5-3" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /></svg>
);
export const IconSpeed = (p) => (
  <svg {...base} {...p}><path d="M5 19a9 9 0 1 1 14 0" /><path d="M12 14l4-5" /><path d="M8.5 19h7" /></svg>
);
export const IconBattery = (p) => (
  <svg {...base} {...p}><rect x="3" y="8" width="15" height="9" rx="2" /><path d="M21 11v3" /><path d="M7 11v3M10.5 11v3" /></svg>
);
export const IconCharge = (p) => (
  <svg {...base} {...p}><path d="M13 3 L5 13 H11 L11 21 L19 11 H13 L13 3 Z" /></svg>
);
export const IconShield = (p) => (
  <svg {...base} {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconRupee = (p) => (
  <svg {...base} {...p}><path d="M7 5h10M7 9h10M7 5c4 0 7 1 7 5 0 3-3 4-6 4l6 6" /></svg>
);
export const IconWrench = (p) => (
  <svg {...base} {...p}><path d="M14.5 5.5a4 4 0 0 0-5 5L4 16v4h4l5.5-5.5a4 4 0 0 0 5-5l-2.7 2.7-2.3-.6-.6-2.3 2.6-2.5Z" /></svg>
);
export const IconLeaf = (p) => (
  <svg {...base} {...p}><path d="M5 19c0-7 5-12 14-12 0 9-5 14-12 14-1.5 0-2-2-2-2Z" /><path d="M9 15c2-3 4-4 7-5" /></svg>
);
export const IconWeight = (p) => (
  <svg {...base} {...p}><path d="M7 9h10l2 11H5L7 9Z" /><circle cx="12" cy="6" r="2" /></svg>
);
export const IconMotor = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></svg>
);
export const IconMail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const IconPhone = (p) => (
  <svg {...base} {...p}><path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
);
export const IconPin = (p) => (
  <svg {...base} {...p}><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const IconClock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconMenu = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconArrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconCheck = (p) => (
  <svg {...base} {...p}><path d="M5 12l4 4 10-10" /></svg>
);
export const IconWhatsApp = (p) => (
  <svg {...base} {...p}><path d="M4 20l1.4-4A8 8 0 1 1 8 18.6L4 20Z" /><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5.7.1 1.5-.6 1.5-1.3l-1.6-.8-.9.8c-.8-.4-1.5-1.1-1.9-1.9l.8-.9-.8-1.6c-.7 0-1.4.8-1.6 1.5Z" fill="currentColor" stroke="none" /></svg>
);
