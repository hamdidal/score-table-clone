import { atom } from "jotai";
import { data } from "./data";
import { IMatchRate } from "./components/Table/types";

export const dataNum = [...data(600)];

export const deneme = atom(0);

export const bets = atom(dataNum);

export const selectedBets = atom<IMatchRate[]>([]);
