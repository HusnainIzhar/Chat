export type TUser = {
    name: string;
    id: string;
    messages:TMsg[]
  };

  type TMsg = {
    content:string;
    type:'received' | 'sent'
  }