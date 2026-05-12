"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";

export default function Navbar() {
  const router = useRouter();

  const items: MenuItem[] = [
    {
      label: "Início",
      icon: "pi pi-home",
      url: "/",
    },
    {
      label: "Recursos",
      icon: "pi pi-star",
      url: "#features",
    },
    {
      label: "Dashboard",
      icon: "pi pi-chart-line",
      url: "/dashboard",
    },
    {
      label: "Câmeras",
      icon: "pi pi-video",
      url: "/cameras",
    },
    {
      label: "Detecções",
      icon: "pi pi-eye",
      url: "/detections",
    },
    {
      label: "Contato",
      icon: "pi pi-envelope",
      url: "#contact",
    },
  ];

  const start = (
    <span className="font-bold text-xl mr-4">
      SKYNET-VISION
    </span>
  );

  const end = (
    <div className="flex items-center gap-2">
      <Button
        label="Entrar"
        text
        onClick={() => router.push("/auth/login")}
      />
      <Button
        label="Cadastrar"
        outlined
        onClick={() => router.push("/auth/register")}
      />
    </div>
  );

  return (
    <div className="w-full bg-transparent">
      <Menubar model={items} start={start} end={end} className="skynet-navbar" />
    </div>
  );
}