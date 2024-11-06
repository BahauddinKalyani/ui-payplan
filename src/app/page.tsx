"use client"
import { Button } from "@/components/ui/button";
import ModeToggle from "@/app/mode-toggle";
import { withAuth } from "@/components/withAuth";
// import { useRouter } from 'next/router';
import { DashboardSkeleton } from "@/components/dashboard-skeleton";

function Home() {
  // const router = useRouter();
  return (
    <>
      <Button>Hello</Button>
      <ModeToggle />
    </>
  );
}

export default Home;