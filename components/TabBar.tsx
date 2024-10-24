import React from "react";
import { BottomNavigation } from "react-native-paper";
import { Route } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

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
    focused,
    color,
  }: {
    route: Route<string>;
    focused: boolean;
    color: string;
  }) => {
    const options = descriptors[route.key].options;
    // @ts-ignore
    const icon = options.icon;
    return <FontAwesome name={icon} size={20} color={color} />;
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
