import { Switch, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { TbSun, TbMoonStars } from "react-icons/tb";

export default function ToggleTheme(props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Switch
      checked={colorScheme === "dark"}
      onChange={() => props.toggleColorScheme()}
      onLabel={<TbSun color={theme.white} size="1.25rem" />}
      offLabel={<TbMoonStars color={theme.colors.gray[6]} size="1.25rem" />}
    />
  );
}
