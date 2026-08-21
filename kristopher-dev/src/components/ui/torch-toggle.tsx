"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kd-torch-lit";

const STYLES = `
.kd-torch-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.kd-torch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
}
.kd-torch-text {
  position: absolute;
  bottom: -34px;
  width: 200px;
  text-align: center;
  color: #d4d4d4;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: ui-monospace, monospace;
}
.kd-torch {
  display: flex;
  justify-content: center;
  height: 150px;
}
.kd-torch-head,
.kd-torch-stick {
  position: absolute;
  width: 30px;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(45deg);
}
.kd-torch-stick {
  position: relative;
  height: 120px;
}
.kd-torch-face {
  position: absolute;
  transform-style: preserve-3d;
  width: 30px;
  height: 30px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  background-color: #000000;
}
.kd-torch-top { transform: rotateX(90deg) translateZ(15px); }
.kd-torch-left { transform: rotateY(-90deg) translateZ(15px); }
.kd-torch-right { transform: rotateY(0deg) translateZ(15px); }
.kd-torch-top div, .kd-torch-left div, .kd-torch-right div { width: 102%; height: 102%; }

.kd-torch-top div:nth-child(1), .kd-torch-left div:nth-child(3), .kd-torch-right div:nth-child(3) { background-color: #ffff9760; }
.kd-torch-top div:nth-child(2), .kd-torch-left div:nth-child(1), .kd-torch-right div:nth-child(1) { background-color: #ffd80060; }
.kd-torch-top div:nth-child(3), .kd-torch-left div:nth-child(4), .kd-torch-right div:nth-child(4) { background-color: #ffffff60; }
.kd-torch-top div:nth-child(4), .kd-torch-left div:nth-child(2), .kd-torch-right div:nth-child(2) { background-color: #ff8f0060; }

.kd-torch-side {
  position: absolute;
  width: 30px;
  height: 120px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(8, 12.5%);
  cursor: pointer;
  translate: 0 12px;
}
.kd-torch-side-left { transform: rotateY(-90deg) translateZ(15px) translateY(8px); }
.kd-torch-side-right { transform: rotateY(0deg) translateZ(15px) translateY(8px); }
.kd-torch-side-left div, .kd-torch-side-right div { width: 103%; height: 103%; }

.kd-torch-side div:nth-child(1) { background-color: #443622; }
.kd-torch-side div:nth-child(2) { background-color: #2e2517; }
.kd-torch-side div:nth-child(3), .kd-torch-side div:nth-child(5) { background-color: #4b3b23; }
.kd-torch-side div:nth-child(4), .kd-torch-side div:nth-child(10) { background-color: #251e12; }
.kd-torch-side div:nth-child(6) { background-color: #292115; }
.kd-torch-side div:nth-child(7) { background-color: #4b3c26; }
.kd-torch-side div:nth-child(8) { background-color: #292115; }
.kd-torch-side div:nth-child(9) { background-color: #4b3a21; }
.kd-torch-side div:nth-child(11), .kd-torch-side div:nth-child(15) { background-color: #3d311d; }
.kd-torch-side div:nth-child(12) { background-color: #2c2315; }
.kd-torch-side div:nth-child(13) { background-color: #493a22; }
.kd-torch-side div:nth-child(14) { background-color: #2b2114; }
.kd-torch-side div:nth-child(16) { background-color: #271e10; }

.kd-torch-container input:checked ~ .kd-torch .kd-torch-face {
  filter: drop-shadow(0px 0px 2px rgb(255, 255, 255))
    drop-shadow(0px 0px 10px rgba(255, 237, 156, 0.7))
    drop-shadow(0px 0px 25px rgba(255, 227, 101, 0.4));
}
.kd-torch-container input:checked ~ .kd-torch .kd-torch-top div:nth-child(1),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-left div:nth-child(3),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-right div:nth-child(3) { background-color: #ffff97; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-top div:nth-child(2),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-left div:nth-child(1),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-right div:nth-child(1) { background-color: #ffd800; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-top div:nth-child(3),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-left div:nth-child(4),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-right div:nth-child(4) { background-color: #ffffff; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-top div:nth-child(4),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-left div:nth-child(2),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-right div:nth-child(2) { background-color: #ff8f00; }

.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(1) { background-color: #7c623e; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(2) { background-color: #4c3d26; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(3),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(5) { background-color: #937344; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(4),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(10) { background-color: #3c2f1c; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(6) { background-color: #423522; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(7) { background-color: #9f7f50; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(8) { background-color: #403320; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(9) { background-color: #977748; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(11),
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(15) { background-color: #675231; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(12) { background-color: #3d301d; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(13) { background-color: #987849; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(14) { background-color: #3b2e1b; }
.kd-torch-container input:checked ~ .kd-torch .kd-torch-side div:nth-child(16) { background-color: #372a17; }
`;

const NINE = Array.from({ length: 4 });
const SIXTEEN = Array.from({ length: 16 });

function Cube() {
  return (
    <div className="kd-torch-head">
      <div className="kd-torch-face kd-torch-top">
        {NINE.map((_, i) => (
          <div key={i} />
        ))}
      </div>
      <div className="kd-torch-face kd-torch-left">
        {NINE.map((_, i) => (
          <div key={i} />
        ))}
      </div>
      <div className="kd-torch-face kd-torch-right">
        {NINE.map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}

function Stick() {
  return (
    <div className="kd-torch-stick">
      <div className="kd-torch-side kd-torch-side-left">
        {SIXTEEN.map((_, i) => (
          <div key={i} />
        ))}
      </div>
      <div className="kd-torch-side kd-torch-side-right">
        {SIXTEEN.map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}

export function TorchToggle({ message }: { message: string }) {
  const [lit, setLit] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setLit(stored === "1");
  }, []);

  const toggle = () => {
    setLit((v) => {
      const next = !v;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  };

  return (
    <label className="kd-torch-container">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <input type="checkbox" checked={lit} onChange={toggle} aria-label={message} />
      <div className="kd-torch">
        <Cube />
        <Stick />
      </div>
      <span className="kd-torch-text">{message}</span>
    </label>
  );
}
