import Banner from "@/app/components/Banner";
import getConversationById from "@/queries/getConversationById";
import getMessages from "@/queries/getMessages";
import ConvoHeader from "./components/ConvoHeader";
import MessageBox from "./components/MessageBox";
import ConvoBody from "./components/ConvoBody";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  console.log(messages);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <Banner />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ConvoHeader conversation={conversation}  />
        <ConvoBody initialMessages={messages} />
        <MessageBox />
      </div>
    </div>
  );
};

export default ChatId;
