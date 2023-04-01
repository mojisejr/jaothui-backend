export interface CreateQuestDTO {
  name: string;
  type: string;
  description: string;
  points: number;
  nftAddress?: string;
  nftRequire?: number;
  erc20Address?: string;
  erc20Require?: number;
}

export interface UpdateQuestDTO {
  name?: string;
  type?: string;
  description?: string;
  points?: number;
  nftAddress?: string;
  nftRequire?: number;
  erc20Address?: string;
  erc20Require?: number;
}
