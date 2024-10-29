import React from "react";
import { BottomNavigation } from "react-native-paper";
import { Route } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";

const TabBar = ({
  navigation,
  state,
  descriptors,
  insets,
}: BottomTabBarProps) => {
  const getLabelText = ({ route }: { route: Route<string> }) =>
    descriptors[route.key].options.title;
  const getIcon = ({
    route,
    color,
  }: {
    route: Route<string>;
    color: string;
  }) => {
    const options = descriptors[route.key].options;
    // @ts-ignore
    const icon = options.icon;
    return <Icon source={icon} size={20} color={color} />;
  };
  const onTabPress = ({ route }: { route: Route<string> }) =>
    navigation.navigate(route.name);

  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={onTabPress}
      renderIcon={getIcon}
      getLabelText={getLabelText}
    />
  );
};

export default TabBar;
