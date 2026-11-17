import { AiChat } from "@/components/ui/ai-chat";
import { useUiStrings } from "@/data/ui-strings";

export function AiChatDemo() {
  return <AiChat strings={useUiStrings().aiChat} />;
}
