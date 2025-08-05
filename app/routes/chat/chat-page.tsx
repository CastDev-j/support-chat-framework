import { useState } from "react";
import { Copy, Download, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { getClient } from "~/fake/fake-data";
import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/chat-page";

interface Message {
  role: "agent" | "user";
  content: string;
  timestamp: string;
}

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const { clientId = "" } = params;
  const client = await getClient(clientId);

  return { client };
}

export function HydrateFallback() {
  return <ChatPageSkeleton />;
}

const ChatPage = ({ loaderData }: Route.ComponentProps) => {

  const { client } = loaderData;

  const [input, setInput] = useState("");
  const [messages] = useState<Message[]>([
    {
      role: "agent",
      content: "Hello, I am a generative AI agent. How may I assist you today?",
      timestamp: "4:08:28 PM",
    },
    {
      role: "user",
      content: "Hi, I'd like to check my bill.",
      timestamp: "4:08:37 PM",
    },
    {
      role: "agent",
      content:
        "Please hold for a second.\n\nOk, I can help you with that\n\nI'm pulling up your current bill information\n\nYour current bill is $150, and it is due on August 31, 2024.\n\nIf you need more details, feel free to ask!",
      timestamp: "4:08:37 PM",
    },
    {
      role: "user",
      content: "Thank you! Can I pay it online?",
      timestamp: "4:08:45 PM",
    },
    {
      role: "agent",
      content:
        "Yes, you can pay your bill online through our website or mobile app. Just log in to your account and follow the payment instructions.",
      timestamp: "4:08:50 PM",
    },
  ]);

  return (
    <div className="flex flex-col h-full">
      {/* MENSAJES */}
      <ScrollArea className="flex-1 overflow-auto px-4 py-6">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <div key={index}>
              {message.role === "agent" ? (
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
                      <span className="text-sm text-muted-foreground">
                        {message.timestamp}
                      </span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-end text-right">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <span className="font-medium">{12}</span>
                    <span className="text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-sm">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* INPUT */}
      <div className="border-t px-4 py-3 bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Aquí podrías manejar el envío
            setInput("");
          }}
          className="flex items-end gap-2 max-w-3xl mx-auto"
        >
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] max-h-40 resize-y py-3 pr-4 rounded-md"
          />

          <Button
            className="h-[44px] px-4 flex items-center gap-2"
            type="submit"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;

export const ChatPageSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="w-12 h-12 border-4 border-muted-foreground border-t-transparent rounded-full animate-spin"></span>
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Cargando...
        </h2>
      </div>
      <p className="text-muted-foreground max-w-md">
        Por favor espera mientras cargamos la información del chat.
      </p>
    </div>
  );
};
