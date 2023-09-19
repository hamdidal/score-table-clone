/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMatch, IMatchRateGroup } from "./components/Table/types";
import { generateBetRate, generateRandomDate } from "../src/utlis";
import { nanoid } from "nanoid";

export const data = (value: number) =>
  Array(value)
    .fill(false)
    .map(() => ({
      id: nanoid(),
      datetime: {
        date: generateRandomDate().format("DD/MM/YYYY"),
        time: generateRandomDate().format("HH:00"),
        isLive: true,
      },
      matchInfo: {
        title: "UEFA Champions League",
        teams: [
          {
            name: "team 1",
            score: "0",
          },
          {
            name: "team 2",
            score: "0",
          },
        ],
        startTime: generateRandomDate().format("HH:00"),
      },
      rates: [
        Array(3)
          .fill(false)
          .map(() => ({
            id: nanoid(),
            rate: generateBetRate().toString(),
          })) as IMatchRateGroup,
      ],
    }));

export function updateRandomScores(data: IMatch[]) {
  const teamsToChange = generateRandomScore(data.length, 4);

  teamsToChange.map((team) => {
    const teamIndex = team.teamIndex;
    const firstTeam = (data.length * Math.random()).toFixed(0);
    const scoreChange = team.score + 1;

    if (Number(firstTeam) > data.length / 2) {
      data[teamIndex].matchInfo.teams[0].score = (
        parseInt(data[teamIndex].matchInfo.teams[0].score) + scoreChange
      ).toString();
    } else {
      data[teamIndex].matchInfo.teams[1].score = (
        parseInt(data[teamIndex].matchInfo.teams[1].score) + scoreChange
      ).toString();
    }
  });
  return data;
}

function generateRandomScore(dataLength: number, n: number): any[] {
  return Array(n)
    .fill(false)
    .map(() => ({
      teamIndex: Math.floor(Math.random() * dataLength),
      firstTeam: Math.floor((Math.random() * dataLength) / 150) % 2 === 0,
      score: Math.floor((Math.random() * dataLength) / 150),
    }));
}
