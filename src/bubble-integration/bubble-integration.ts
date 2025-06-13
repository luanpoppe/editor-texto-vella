import { Editor } from "@tiptap/react";
import { SendParamsToBubble } from "./bubble-functions.model";
import { ReceiveFromBubble } from "./receive-from-bubble";

export class BubbleUtils {
  constructor(private editor: Editor) {}

  static createSendParams(
    output1?: any,
    output2?: any,
    output3?: any,
    output4?: any
  ): SendParamsToBubble {
    return {
      output1,
      output2,
      output3,
      output4,
    };
  }

  loadAllBubbleIntegrations() {
    const receive = new ReceiveFromBubble(this.editor);
    receive.initialize();
  }
}
