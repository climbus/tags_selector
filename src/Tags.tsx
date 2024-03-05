import { Input, Stack, Typography } from "@mui/joy";
import { useState } from "react";

interface ITag {
  id: number;
  name: string;
}

export function Tags() {
  const [tags, setTags] = useState<ITag[]>([]);

  const handleChange = async (value: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tags?phrase=${value}`,
    );
    const data = await response.json();
    setTags(data);
  };

  return (
    <Stack spacing={4}>
      <Typography level="h3">Tagi</Typography>
      <Input
        slotProps={{ input: { "aria-label": "phrase" } }}
        onChange={(e) => handleChange(e.target.value)}
      />
      {tags.map((tag) => (
        <Typography key={tag.id}>{tag.name}</Typography>
      ))}
    </Stack>
  );
}
