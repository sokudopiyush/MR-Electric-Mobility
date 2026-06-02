"use client";

import { useState } from "react";
import Image from "next/image";
import { IconMenu } from "@/components/Icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar" id="top">
      <div className="container nav-inner">
        <a href="/" className="brand">
          <Image
            src="/brand/MR.png"
            alt="Mr Electric Mobility logo"
            width={48}
            height={48}
            className="brand-mark"
            priority
          />
          <span className="brand-text">
            Mr Electric Mobility
            <small>Authorised Sokudo Distributor</small>
          </span>
        </a>
        <nav className={`nav-links${open ? " open" : ""}`}>
          <a href="#products" onClick={close}>Scooters</a>
          <a href="#why" onClick={close}>Why us</a>
          <a href="#about" onClick={close}>About</a>
          <a href="#contact" onClick={close}>Contact</a>
          <a href="#contact" className="btn btn-sm btn-primary nav-cta" onClick={close}>
            Book a test ride
          </a>
        </nav>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <IconMenu />
        </button>
      </div>
    </header>
  );
}
