import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

const PHRASES = [
  "FULL STACK DEV",
  "REACT + TYPESCRIPT",
  "JAVA + SPRING BOOT",
  "QA AUTOMATION",
  "PLAYWRIGHT E2E",
  "SANTIAGO, CHILE",
];

export function TextFlippingBoardDemo() {
  return (
    <div className="flex justify-center px-4">
      <TextFlippingBoard words={PHRASES} />
    </div>
  );
}
