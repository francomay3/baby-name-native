import { StackActions } from "@react-navigation/native";
import throttle from "../utils/throttle";
import * as React from "react";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

const Header = ({
  navigation,
  options,
  route,
  // @ts-ignore
  back,
}: NativeStackHeaderProps | BottomTabHeaderProps) => {
  const { title } = options;

  const onGoBack = throttle(() => {
    navigation.dispatch({
      ...StackActions.pop(),
      source: route.key,
    });
  }, 50);

  return (
    <Appbar.Header elevated>
      {back && <Appbar.BackAction onPress={onGoBack} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
