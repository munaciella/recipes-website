/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { NextPage } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const LoginPage: NextPage = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
    </div>
  );
};

export default LoginPage;