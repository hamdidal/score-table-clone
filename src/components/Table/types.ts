export interface TableProps {}

export interface IMatchDateTime {
  date: string;
  time: string;
  isLive: boolean;
}

export interface Team {
  name: string;
  score: string;
}

export interface IMatchInfo {
  title: string;
  teams: Team[];
  startTime: string;
}

export interface IMatchRate {
  id: string;
  rate: string;
}

export type IMatchRateGroup = IMatchRate[];

export interface IMatch {
  id: string;
  datetime: IMatchDateTime;
  matchInfo: IMatchInfo;
  rates: IMatchRateGroup[];
}
