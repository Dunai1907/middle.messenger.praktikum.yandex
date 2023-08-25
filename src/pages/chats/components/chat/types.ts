export class ChatProps {
  stylesChat!: string;
  stylesAvatar!: string;
  avatar!: string;
  stylesMain!: string;
  stylesWrap!: string;
  stylesName!: string;
  stylesSpanName!: string;
  name!: string;
  stylesDate!: string;
  stylesSpanDate!: string;
  date!: string;
  stylesText?: string;
  stylesSpanText?: string;
  text?: string;
  stylesNumber?: string;
  stylesSpanNumber?: string;
  number?: string;
  chatId?: string;
  isUnreadCount!: boolean;
  isLastMessage!: boolean;
  attr!: Record<string, string>;
  events?: {
    // eslint-disable-next-line no-unused-vars
    click: (event: any) => void;
  };
}
