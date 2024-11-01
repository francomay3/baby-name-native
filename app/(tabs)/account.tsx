import Account from "@/views/Account";
import { Box } from "@/components/layout";
import { MessageProvider } from "@/providers/message";

export default function account() {
  return (
    <Box bg="surface" w="100%" h="100%">
      <MessageProvider>
        <Account />
      </MessageProvider>
    </Box>
  );
}
