/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DXWxo8nyXdU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function CalenderPrice() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          <span className="text-lg font-medium">April 2024</span>
          <Button variant="ghost">
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-5 gap-4 p-6">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={`rounded-lg overflow-hidden bg-gradient-to-t ${
                i % 2 === 0 ? "from-[#FFCDD2] to-[#E53935]" : "from-[#C8E6C9] to-[#43A047]"
              }`}
            >
              <div className="bg-background/80 p-4 flex flex-col items-start">
                <span className="text-sm font-medium text-muted-foreground">Mon, Apr {i + 1}</span>
                {i % 2 === 0 ? (
                  <div className="mt-2 flex flex-col items-start">
                    <span className="text-lg font-semibold text-red-500">-$1,234.56</span>
                    <span className="text-sm text-muted-foreground">PNL</span>
                  </div>
                ) : (
                  <div className="mt-2 flex flex-col items-start">
                    <span className="text-lg font-semibold text-green-500">+$987.65</span>
                    <span className="text-sm text-muted-foreground">Profits</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}