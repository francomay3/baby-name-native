import React, { Fragment, useRef, useState } from "react";
import { Image } from "react-native";
import { faces, Name, names, titles } from "@/database/db";
import * as arr from "@/utils/array";
import { Button, Title } from "react-native-paper";
import { Column, Container, Row } from "@/components/layout";

type Faces = [number, number];
type Names = [Name, Name];

const get2New = <T,>(allItems: T[], previousItems?: [T, T]): [T, T] => {
  let availableItems = arr.substractItems<T>(allItems, previousItems);

  const item1 = arr.getRandomItem<T>(availableItems);
  availableItems = arr.substractItems<T>(availableItems, [item1]);

  const item2 = arr.getRandomItem<T>(availableItems);
  return [item1, item2];
};

const getNewFaces = (previousFaces?: Faces): Faces =>
  get2New<number>(faces, previousFaces);

const getNewNames = (previousNames?: Names): Names =>
  get2New<Name>(names, previousNames);

const useList = <T,>(list: T[]) => {
  const [current, setCurrent] = useState<T>(arr.getRandomItem<T>(list));
  const scrambledList = useRef(list.sort(() => Math.random() - 0.5));
  const next = () => {
    const currentIndex = scrambledList.current.indexOf(current);
    const nextIndex =
      currentIndex === scrambledList.current.length - 1 ? 0 : currentIndex + 1;

    setCurrent(scrambledList.current[nextIndex]);
  };
  return [current, next] as const;
};

const Match = () => {
  const [faces, setFaces] = useState<Faces>(getNewFaces());
  const [names, setNames] = useState<Names>(getNewNames());
  const [title, nextTitle] = useList<string>(titles);

  const handleNameSelection = (name: string) => {
    setFaces(getNewFaces(faces));
    setNames(getNewNames(names));
    nextTitle();
  };

  return (
    <Container center>
      <Column gap={24} align="center" w="100%" mw={350}>
        <Title>{title}</Title>
        <Row gap={16} align="center" w="100%">
          {names.map(({ name }, i) => (
            <Fragment key={name}>
              <Column gap={12} align="center" style={{ flex: 1 }}>
                <Image
                  source={faces[i]}
                  style={{ borderRadius: 9999, width: 54, height: 54 }}
                />
                <Button
                  mode="contained"
                  key={name}
                  onPress={() => handleNameSelection(name)}
                >
                  {name}
                </Button>
              </Column>
              {i === 0 && (
                <Image
                  source={require("@/assets/images/match.png")}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 9999,
                    flex: 1,
                  }}
                />
              )}
            </Fragment>
          ))}
        </Row>
      </Column>
    </Container>
  );
};

export default Match;
