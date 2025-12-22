"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export const Social = () => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <Button size="lg" variant="outline">
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button size="lg" variant="outline">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}