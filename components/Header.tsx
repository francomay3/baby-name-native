import * as React from "react";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { router, useNavigation } from "expo-router";
const Header = (props: NativeStackHeaderProps) => {
  const title = props.options.title;
  // @ts-ignore
  const backTo = router.canGoBack();

  return (
    <Appbar.Header elevated>
      {backTo && <Appbar.BackAction onPress={router.back} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
