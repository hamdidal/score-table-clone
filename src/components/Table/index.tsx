/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Table.scss";
import { FC, useEffect, useState } from "react";
import { IMatchRate, TableProps } from "./types.ts";
import { Table as MTable, Flex, Box, Text } from "@mantine/core";
import { IMatch, IMatchRateGroup } from "./types.ts";
import { columnsData } from "./const.ts";
import { AiOutlineHistory } from "react-icons/ai";
import { CiStreamOn } from "react-icons/ci";
import { useAtom } from "jotai";
import { bets as betsState, selectedBets } from "../../state.ts";
import { updateRandomScores } from "../../data.ts";

const Table: FC<TableProps> = () => {
  const columns = columnsData.map((element) => (
    <>
      <th>{element.name}</th>
    </>
  ));

  const [bets, setBets] = useAtom(betsState);
  const [selectedRates, setSelectedRates] = useAtom(selectedBets);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const updateData = updateRandomScores(bets);
    setBets(updateData);
  }, [bets, setBets, updateCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUpdateCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const rows = bets.map((matchData: IMatch, matchDataIndex: number) => (
    <tr
      key={matchData.id}
      style={{ background: matchDataIndex % 2 === 0 ? "#1C1C1C" : "#404040" }}
    >
      <td>
        <Flex rowGap="lg">
          <Box
            w="135px"
            h="36px"
            bg={matchDataIndex % 2 === 0 ? "#404040" : "#1C1C1C"}
            color="white"
            className="box"
            mr="xs"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Flex align="center" gap="sm">
              <Flex justify="center" align="center" h="100%" w="20px">
                <AiOutlineHistory color="white" />
              </Flex>
              <Flex direction="column">
                <Text fz="xs" color="white">
                  {matchData.datetime.date}
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Box
            w="36px"
            h="36px"
            bg={matchDataIndex % 2 === 0 ? "#404040" : "#1C1C1C"}
          >
            <Flex justify="center" align="center" h="100%" w="100%">
              <CiStreamOn color="white" />
            </Flex>
          </Box>
        </Flex>
      </td>
      <td>
        <Flex
          direction="column"
          justify="center"
          align="center"
          w="300px"
          rowGap="xs"
        >
          <Box className="match-info__title">
            <Text>{matchData.matchInfo.title}</Text>
          </Box>
          <Flex align="center" w="fit-content" gap={"lg"}>
            <Text color="white">
              {matchData.matchInfo.teams[0].name}:{" "}
              {matchData.matchInfo.teams[0].score}{" "}
            </Text>
            <Box className="match-info__time">{matchData.datetime.time}</Box>
            <Text color="white">
              {matchData.matchInfo.teams[1].name}:{" "}
              {matchData.matchInfo.teams[1].score}{" "}
            </Text>
          </Flex>
        </Flex>
      </td>
      <td>
        <Box>
          {matchData.rates.map((matchRateGroup: IMatchRateGroup) => (
            <Flex columnGap="xs">
              {matchRateGroup?.map((matchRate, index: number) => (
                <Flex
                  key={index}
                  w="40px"
                  h="40px"
                  justify="center"
                  align="center"
                  p="7px"
                  bg={
                    selectedRates.find(
                      (selectedRate: IMatchRate) =>
                        selectedRate.rate === matchRate.rate
                    )
                      ? "orange"
                      : "white"
                  }
                  onClick={() =>
                    setSelectedRates(() => [
                      {
                        id: matchRate.id,
                        rate: matchRate.rate,
                      },
                    ])
                  }
                >
                  {matchRate.rate}
                </Flex>
              ))}
            </Flex>
          ))}
        </Box>
      </td>
    </tr>
  ));

  return (
    <div>
      <MTable>
        <thead>
          <tr>{columns}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </MTable>
    </div>
  );
};

export default Table;
