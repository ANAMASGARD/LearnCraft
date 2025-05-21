import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/dist/types/server"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <UserButton />
    </div>
  )
}
