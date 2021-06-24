interface IComplimentRequestDTO {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message?: string;
}

export { IComplimentRequestDTO };
