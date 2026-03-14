'use client'

import { useState } from "react";

export default function ProblemsSolutions() {
  const [active, setActive] = useState("problems");

  const problems = [
    {
      title: "Scattered Secrets",
      desc: "API keys spread across .env files, dashboards, and random documents."
    },
    {
      title: "Expired Keys",
      desc: "Expired tokens can silently break your production deployments."
    },
    {
      title: "Insecure Sharing",
      desc: "Teams often share API keys through chats or unsecured documents."
    },
    {
      title: "Billing Surprises",
      desc: "Without monitoring, unexpected API usage can lead to huge bills."
    }
  ];

  const solutions = [
    {
      title: "Secure Vault",
      desc: "Store API keys safely with encryption designed specifically for developer secrets."
    },
    {
      title: "Key Organization",
      desc: "Organize API keys by project, environment, and service in one centralized dashboard."
    },
    {
      title: "Smart Alerts",
      desc: "Get notified when usage spikes or keys are about to expire."
    },
    {
      title: "Team Access",
      desc: "Share secrets safely with teammates using role-based access control."
    }
  ];

  const data = active === "problems" ? problems : solutions;

  return (
    <section className="ps-section">

      <div className="top-left-circle"></div>
       <div className="bottom-left-circle"></div>

      <div className="ps-container">

        {/* LEFT SIDE */}
        <div className="ps-left">
          <h2>{active === "problems" ? "Problems" : "Solutions"}</h2>

          <div className="toggle">
            <button
              className={active === "problems" ? "active" : ""}
              onClick={() => setActive("problems")}
            >
              Problems
            </button>

            <button
              className={active === "solutions" ? "active" : ""}
              onClick={() => setActive("solutions")}
            >
              Solutions
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="ps-right">

          <div className="big-circle">

            <div className="points-grid">
              {data.map((item, i) => (
                <div key={i} className="point">

                  <div className="icon"></div>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      <div className="overlap-circle"></div>

    </section>
  );
}