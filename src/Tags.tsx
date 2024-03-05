import { Input, Stack, Typography } from "@mui/joy";

export function Tags() {
  return (
    <Stack spacing={4}>
      <Typography level="h3">Tagi</Typography>
      <Input slotProps={{ input: { "aria-label": "phrase" } }} />
    </Stack>
  );
}
